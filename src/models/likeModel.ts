import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { ILike } from "../types/likes";
import Posts from "./postModel";
class Likes extends Model {
  createLike = async (body: ILike) => {
    const { userid, postid } = body;
    return await Likes.create({ userid, postid });
  };
  unlike = async (body: ILike) => {
    const { userid, postid } = body;

    return await Likes.destroy({
      where: {
        userid,
        postid,
      },
    });
  };
  static async associate({ Posts, User }) {
    this.belongsTo(User, { foreignKey: "userid" });

    this.belongsTo(Posts, {
      foreignKey: "postid",
      as: "posts",
      targetKey: "id",
    });

    await this.sync();
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

Likes.init(
  {
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "cascade",

      references: {
        model: "Posts",
        key: "id",
      },
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "cascade",
      references: {
        model: "Users",
        key: "id",
      },
    },
  },

  {
    sequelize,
    modelName: "Likes",
  }
);

export default Likes;
