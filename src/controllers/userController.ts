import { Response, RequestHandler } from "express";
import User from "../models/userModel";
 import bcrypt, { hash } from "bcryptjs";
 import generateToken from "../config/generateToken"
  const saltround:number = 10;

const getUser : RequestHandler = async (req, res): Promise<Response> => {
  const id:string = req.params.id ;
  try {
    const user:object = await User.findByPk(id);
 
     return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllUsers: RequestHandler = async (req, res): Promise< Response>  => {
   try {
    const users:object = await User.findAll({});
 
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
const deleteUser: RequestHandler = async (req, res) : Promise< Response>  => {
  const id:string = req.params.id;

  try {
     await User.destroy({ where: { id: id } });
    return res.json("Deleted");
  } catch (err) {
     return res.status(500).json({ error: "Something went wrong" });
  }
};
const deleteAllUser: RequestHandler = async (req, res) : Promise< Response>  => {
  try {
    await User.destroy({});
    return res.json("Deleted All");
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
const createUser: RequestHandler = async (req, res) : Promise<any>  => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, saltround, async (error: any, hash:string):Promise<Response> => {
 
    if (error) {
       res.send({
        success: false,
        statusCode: 500,
        message: "Getting error during the connection",
      });

      return;
    } else {
      try {  
        const user:object = await User.create({ username, email, password: hash });

        return res.json(user);
      } catch (err) {
        return res.status(500).json(err.message);
      }
    }
  });
};
const updateUser: RequestHandler = async (req, res): Promise<Response> => {
 
  const { id }  = req.params ;
  const { username }:{username:string} = req.body;
   try {
    await User.update({ username: username }, { where: { id: id } });
    return res.json("Updated Successfully");
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
const loginUser:RequestHandler = async (req, res): Promise<Response> => {
   const {  email, password } = req.body;
   console.log('login user')
 try{
   const user =await User.findOne({where:{email:email}});
   if(!user) throw new Error('User not Found')
    let hash:string=user.dataValues.password;

  return bcrypt.compare(password, hash, function(err, result) {
       if (err) throw new Error("Password didnt Match")

      if (result) {
        return   res.json({
              message: 'Success',
              statusCode: 200,
                data: {token: generateToken(email)}
          });
      } else {
       return   res.json({
              message: 'failed',
              statusCode: 500,
              data: err
          });
      }})
 } catch(err){
return res.status(500).json(`${err}`)

 }
 


  
 };
export {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  deleteAllUser,
  loginUser
};
