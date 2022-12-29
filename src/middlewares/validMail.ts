import { RequestHandler, Request, Response, NextFunction } from "express";
import response from "../config/response";
import schema from "./joiSchema";

const validate: RequestHandler = async (req, res, next): Promise<any> => {
  console.log("validate");
  const { username, email, password } = req.body;

  try {
    await schema.validateAsync({ username, email, password });

    next();
  } catch (err) {
    return response(res, 400, err.message, false, null, false);
  }
};

export default validate;
