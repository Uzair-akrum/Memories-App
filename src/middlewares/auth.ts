import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

// export interface CustomRequest extends Request {
//  token: string | JwtPayload;
// }

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const token = req
      .header("Authorization")
      ?.replace("Bearer ", "")
      .slice(2, -1);

    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWTTOKEN);
     res.locals = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
