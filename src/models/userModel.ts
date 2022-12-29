import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
class User extends Model { 
  static associate({ Posts,Comments }) {
    this.hasMany(Posts,{ onDelete:'CASCADE' });
 

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
      validate:{
        isValid(value){
         if(value.length<5) throw new Error('Password too short');
       
        }
           },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
       unique:true,
     
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
