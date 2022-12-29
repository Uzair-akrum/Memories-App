import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { IUser } from "../types/user";
import Posts from "./postModel";
class User extends Model {
  findUserbyPk = async (id: number) => {
    return await User.findByPk(id);
  };
  findbyEmail = async (email: string) => {
    return await User.findOne({ where: { email: email } });
  };
  findUser = async (id: string) => {
    return await User.findOne({
      where: {
        id: id,
      },
      include: {
        model: Posts,
        as: "posts",
      },
    });
  };
  createUser = async (body: IUser) => {
    const { username, email, password } = body;
    return await User.create({
      username,
      email,
      password: password,
    });
  };
  updateUser=async(body,id,email)=>{
    const user = await User.update(body, {
      where: { id,email },
    });
    if(!user) throw new Error('User not found');
    return user;
   }
  deleteUser = async (id, email) => {
    return await User.destroy({ where: { id: id, email: email } });
  };
  findbyUsername = async (username) => {
    return await User.findOne({ where: { username: username } });
  };

  static async associate({ Posts, Comments, Likes, Shares }) {
    this.hasMany(Posts, { as: "posts", foreignKey: "userid", sourceKey: "id" });
    this.hasMany(Comments, { foreignKey: "userid", as: "comments" });
    this.hasMany(Likes, { foreignKey: "userid" });
    this.hasMany(Shares, { foreignKey: "userid" });

    this.sync();
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
  }
);

export default User;
