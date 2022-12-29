import { RequestHandler } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../config/generateToken";
import response from "../utils/response";
import Posts from "../models/postModel";
import { IUser, IResponseLocals } from "../types/user";
import { userInstance } from "../models/index";
import hashed from "../config/hash";

const getUser: RequestHandler = async (req, res) => {
  const id: string = req.params.id;

  try {
    const user = await userInstance.findUser(id);

    return response(res, 201, "User Found", true, user, false);
  } catch (err) {

    return response(res, 404, "No User Found!", false, null, err);
  }
};
const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.findAll({});

    return response(res, 201, "User Created", true, users, false);
  } catch (err) {
    return response(res, 500, "Unable to fetch Users!", false, null, true);
  }
};
const deleteUser: RequestHandler = async (req, res) => {
  const id: string = req.params.id;
  const responseLocals: IResponseLocals = res.locals.data;

  if (!responseLocals) throw new Error("User not Found!");
  try {
    await userInstance.deleteUser(id, responseLocals.user);
    return response(res, 202, "Deleted!", true, null, false);
  } catch (err) {
    return response(res, 500, `${err.message}`, false, null, true);
  }
};
const deleteAllUser: RequestHandler = async (req, res) => {
  try {
    await User.destroy({});
    return response(res, 202, "Deleted All!", true, null, false);
  } catch (err) {
    return response(res, 400, "Unable to Delete Users!", false, null, true);
  }
};
const createUser: RequestHandler = async (req, res) => {
  const body: IUser = req.body;

  try {
    const hashedPassword: string = await hashed(body.password, res);
    body.password = hashedPassword;
    const user = await userInstance.createUser(body);
    return response(res, 201, "User Created!", true, user, false);
  } catch (err) {
    return response(res, 400, err, false, null, true);
  }
};
const updateUser: RequestHandler = async (req, res) => {
  const body: IUser = req.body;
  const { id } = req.params;
  const responseLocals: IResponseLocals = res.locals.data;
  if (!responseLocals) throw new Error("User not Found!");
  try {
    const hashedPassword: string = await hashed(req.body?.password, res);
    body.password = hashedPassword;

    const user = await userInstance.updateUser(body, id, responseLocals.user);

    return response(res, 201, "Updated User!", true, user, false);
  } catch (err) {
    return response(res, 400, `${err}`, false, null, true);
  }
};
const loginUser: RequestHandler = async (req, res) => {
  const body: IUser = req.body;
  const { email, password } = body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) throw new Error("User not Found");
    let hash: string = user.dataValues.password;

    return bcrypt.compare(password, hash, function (err, result) {
      if (err) throw new Error("Password didnt Match");

      if (result) {
        return response(
          res,
          200,
          " Logged In!",
          true,
          { token: generateToken(email, user.dataValues.id) },
          false
        );
      } else {
        return response(res, 400, "Unable to Log in!", true, null, false);
      }
    });
  } catch (err) {
    return response(res, 400, `${err}`, true, null, false);
  }
};
const findByEmail: RequestHandler = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userInstance.findbyEmail(email);
    return response(res, 201, "User Found!", true, user, false);
  } catch (err) {
    return response(res, 400, `${err}`, false, null, true);
  }
};
const findByUsername: RequestHandler = async (req, res) => {
  const { name } = req.params;
  try {
    const user = await userInstance.findbyUsername(name);
    return response(res, 201, "User Found!", true, user, false);
  } catch (err) {
    return response(res, 400, `${err}`, false, null, true);
  }
};
export {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  deleteAllUser,
  loginUser,
  findByEmail,
  findByUsername,
};
