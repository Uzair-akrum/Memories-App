import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
class Posts extends Model {
  static associate({ User  }) {
    this.belongsTo(User ,{
      foreignKey: { name: 'userid', allowNull: false },
      onDelete:'CASCADE'} );
    this.sync();
  }
 
}

Posts.init(
  {
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
      allowNull: false,
      references:{
        model:"Users",
        key:'id',
      
      }
      
      

    },
    //  images: {
    //   type: DataTypes.ARRAY(DataTypes.TEXT),
    //   allowNull: false

    //  }
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Posts",
  }
);

export default Posts;
