import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
class ProductTag extends Model {
  static associate({ User ,Tags }) {
 
     this.sync();

  }
 }

ProductTag.init(
  {
    
    
    postid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:"Posts",
        key:'id',
      
      }
      
      

    },
    tagid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
          model:"tagid",
          key:'id',
        
        }
        
        
  
      },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "ProductTag",
  }
);

export default ProductTag;
