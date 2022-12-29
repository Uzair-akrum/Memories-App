import { Request, Response, RequestHandler } from "express";
import sequelize from "../config/database";
import Posts from "../models/postModel";
import User from "../models/userModel";
import { Sequelize ,Op} from "sequelize";

const createPost:RequestHandler  = async (req, res): Promise<Response> => {
  const { title, description, images, userid,tags } = req.body;

  try {
    const user = await User.findByPk(userid) ;
    if(!user)  throw new Error('User not found')
     
      const post = await Posts.create({
      title,
      description,
      images,
      userid: user.dataValues.id,
      tags:tags
    });
if(!post) throw new Error('Something went Wrong No Post Created')
    return res.json(post);
  } catch (err) {
    
     return res.status(500).json(`${err}` );
  }
};
const getPost:RequestHandler  = async (req, res): Promise<Response> => {
  const { id } = req.params;
  try {
    const post = await Posts.findByPk(id);
     if(!post) throw new Error('Not able to create post')

    return res.json(post);
  } catch (err) {
      return res.status(500).json(`${err}`);
  }
};
const getPostByUser:RequestHandler  = async (req, res): Promise<Response> => {
   const { id } = req.params;
   try {
     const posts = await Posts.findAll({where:{userid:id}});
      if(!posts)throw new Error('No Posts by User')
 
     return res.json(posts);
   } catch (err) {
     console.log(err);
     return res.status(500).json( `${err}`);
   }
 };
 const deletePost:RequestHandler = async (req, res): Promise<Response> => {
  const { id } = req.params;
  try {
     await Posts.destroy({where:{id:id}});
     

    return res.json('Post Deleted');
  } catch (err) {
      return res.status(500).json(`${err}`);
  }
};
const SearchByDescription:RequestHandler = async (req, res): Promise<Response> => {

  const { word} = req.params;
     try {
    const posts= await Posts.findAll({where:{ 
      [Op.or]:
{description:{

  [Op.iLike]:`%${word }%`
} ,tags:{
  
  [Op.contains]:[word]
},title:{
  [Op.iLike]:`%${word}%`
}}

    }});
     

    return res.json(posts);
  } catch (err) {
      return res.status(500).json(`${err}`);
  }
};
export { createPost, getPost,getPostByUser,deletePost,SearchByDescription };
