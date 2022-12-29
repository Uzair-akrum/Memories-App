import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Posts from "./postModel";
class Shares extends Model {
  static async  associate({ Posts, User }) {
    // this.belongsTo(User, { foreignKey: "userid"});

    //  this.belongsTo(Posts, { foreignKey: "postid" ,as:"posts",targetKey:'id' })

    await this.sync();
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

Shares.init(
  {
     
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete:"cascade",

      references:{
        model:"Posts",
        key:'id',
      
      }
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete:"cascade",
      references:{
        model:"Users",
        key:'id',
      
      }
      
      

    },

  },
 
  {
    
    sequelize,
    modelName: "Shares",
  }
);
 export default Shares;
 
 
