import { RequestHandler } from "express";
import response from "../utils/response";
import userSchema from "./joiSchema";
import { IUser } from "../types/user";
const validate: RequestHandler = async (req, res, next): Promise<any> => {
  if (req.method == "DELETE") {
    next();
    return;
  }

  const body: IUser = req.body;
  const { username, email, password } = body; 

  try { 
    await userSchema.validateAsync({ username, email, password });

    next();
  } catch (err) {
    return response(res, 400, err.message, false, null, false);
  }
};

export default validate;
