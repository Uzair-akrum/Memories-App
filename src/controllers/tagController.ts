import { Request, Response, RequestHandler } from "express";
import sequelize from "../config/database";
 import Tags from "../models/tagModel";
import { Sequelize ,Op} from "sequelize";



const createTag = async (req, res): Promise<Response> => {
    const { title } = req.body;
console.log('tag')
    try {
        
        const tag = await Tags.create({
        title,
       
      });
  if(!tag) throw new Error('Something went Wrong No Post Created')
      return res.json(tag);
    } catch (err) {
      
       return res.status(500).json(`${err}` );
    }
  };
  const deleteTag:RequestHandler = async (req, res): Promise<Response> => {
    const { id } = req.params;
    try {
       await Tags.destroy({where:{id:id}});
       
  
      return res.json('Tag Deleted');
    } catch (err) {
        return res.status(500).json(`${err}`);
    }
  };

  export {createTag ,deleteTag };
