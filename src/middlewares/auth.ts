import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { IResponseLocals } from "../types/user";
import dotenv from "dotenv";
import response from "../utils/response";
dotenv.config();

export const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req
      .header("Authorization")
      ?.replace("Bearer ", "")
      .slice(2, -1);

    if (!token) throw new Error();

    const decoded: IResponseLocals = jwt.verify(token, process.env.JWTTOKEN);
    res.locals = decoded;

    next();
  } catch (err) {
    return response(res, 401, "Please Authenticate", false, null, true);
  }
};
