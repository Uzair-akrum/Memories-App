import Likes from "../models/likeModel";
import { RequestHandler } from "express";
import response from "../utils/response";
import { likeInstance } from "../models/index";
import { IResponseLocals } from "../types/user";
import { ILike } from "../types/likes";
const alreadyLiked = async (body: ILike) => {
  return await likeInstance.unlike(body);
};
const likePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
   const responseLocals: IResponseLocals = res.locals.data;
  const body: ILike = { userid: responseLocals.id, postid: id };

  try {
    if (!(await alreadyLiked(body))) {
      await likeInstance.createLike(body);
      return response(res, 201, "Liked!", true, null, false);
    }
    return response(res, 201, "Unliked!", true, null, false);
  } catch (err) {
    return response(res, 400, `${err}`, false, null, true);
  }
};

export { likePost };
