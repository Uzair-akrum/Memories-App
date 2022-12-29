import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = function generate(user: string, id: number): string {
  const tokenSecret: string = process.env.JWTTOKEN;

  return jwt.sign({ data: { user, id } }, tokenSecret, {
    expiresIn: process.env.EXPIRESIN,
  });
};

export default generateToken;
