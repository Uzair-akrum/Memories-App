import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { IComment } from "../types/comments";
class Comments extends Model {
  createComment = async (body: IComment) => {
    const { postid, commentText, userid } = body;
    return await Comments.create({
      body: commentText,
      userid,
      postid,
    });
  };
  findCommentAgainstUser = async (id, userid) => {
    const comment = await Comments.findOne({
      where: {
        id: id,
      },
    });
    if (!comment) throw new Error("Comment doesnt exist");
    if (comment.dataValues.userid !== userid)
      throw new Error("Not Authenticated");
    return comment;
  };
  static associate({ Posts, User }) {
    this.belongsTo(Posts, { foreignKey: "postid", as: "comments" });
    this.belongsTo(User, { foreignKey: "userid" });

    this.sync();
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

Comments.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    modelName: "Comments",
  }
);

export default Comments;
