import { DataTypes, HasManyHasAssociationsMixin, Model } from "sequelize";
import sequelize from "../config/database";
import Likes from "../models/likeModel";
import { Op } from "sequelize";
import { ISharePost, IUserPost, IPost } from "../types/post";
import Comments from "../models/commentsModel";
import {
  HasManyCountAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
class Posts extends Model<
  InferAttributes<Posts>,
  InferCreationAttributes<Posts>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare userid: string;
  declare sharedFrom: string | object;
  declare images: string[];
  declare tags: string[];
  declare hasLikes: HasManyHasAssociationsMixin<Likes, number>;
  declare countLikes: HasManyCountAssociationsMixin;

  sharedBy = async (id: string) => {
    return await Posts.findAll({
      where: {
        sharedFrom: id,
      },
    });
  };

  createPost = async (body: IUserPost) => {
    const { title, description, images, userid, tags, sharedFrom } = body;
    return await Posts.create({
      title,
      description,
      images,
      userid,
      tags,
      sharedFrom,
    });
  };

  updatePost = async (body: IPost, id: string) => {
    return await Posts.update(
      body,

      {
        where: {
          id: id,
        },
      }
    );
  };

  getPost = async (id: string) => {
    return await Posts.findOne({
      include: [
        {
          model: Comments,
          as: "comments",
          attributes: ["body"],
        },
      ],

      where: { id: id },
    });
  };
  getPostsByUser = async (id: string) => {
    return await Posts.findAll({
      include: [
        {
          model: Comments,
          as: "comments",
          attributes: ["body"],
        },

        {
          model: Likes,
          attributes: [
            "id",
            [sequelize.fn("COUNT", sequelize.col("likes.id")), "likesCount"],
          ],
          as: "likes",
        },
      ],

      where: { id: id },
      group: ["Posts.id", "comments.id", "likes.id"],
    });
  };
  findPostAgainstUser = async (id, userid) => {
    const post = await Posts.findOne({
      where: {
        id: id,
      },  
    });
    if (!post) throw new Error("No Post Found");
    if (post.userid !== userid) throw new Error("User not authorized");
    return post;
  };
  searchPost = async (word) => {
    return await Posts.findAll({
      where: {
        [Op.or]: {
          description: {
            [Op.iLike]: `%${word}%`,
          },
          tags: {
            [Op.contains]: [word],
          },
          title: {
            [Op.iLike]: `%${word}%`,
          },
        },
      },
    });
  };

  static async associate({ User, Comments, Likes, Shares }) {
    this.belongsTo(User, {
      onDelete: "CASCADE",
      as: "user",
      foreignKey: "userid",
      targetKey: "id",
    });
    this.hasMany(Comments, { foreignKey: "postid", as: "comments" });
    this.hasMany(Likes, { as: "likes", foreignKey: "postid", sourceKey: "id" });
    this.hasMany(Shares, { foreignKey: "postid" });

    await this.sync();
  }
}
Posts.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "cascade",
      references: {
        model: "Users",
        key: "id",
      },
    },
    sharedFrom: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "cascade",
      references: {
        model: "Posts",
        key: "id",
      },
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Posts",
  }
);

export default Posts;
