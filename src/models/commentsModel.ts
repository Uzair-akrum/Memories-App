import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
class Comments extends Model {
  static associate({ Posts, User }) {
    this.belongsTo(Posts, { foreignKey: "postid", as: "comments" });
    this.belongsTo(User, { foreignKey: "userid", as: "comments" });

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
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comments",
  }
);

export default Comments;
