import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
class Tags extends Model {
  static associate({ Posts, ProductTag }) {
    this.belongsToMany(Posts, { through: ProductTag });
    this.sync();
  }
}

Tags.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Tags",
  }
);

export default Tags;
