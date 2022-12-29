import Comments from "../models/commentsModel";
import { Response, RequestHandler } from "express";
import response from "../utils/response";
import User from "../models/userModel";
import Posts from "../models/postModel";
import { commentInstance, postInstance } from "../models/index";
import { IComment } from "../types/comments";
import { IResponseLocals } from "../types/user";
const createComment: RequestHandler = async (req, res) => {
  const body: IComment = req.body;
  const { postid } = body;
  const responseLocals: IResponseLocals = res.locals.data;
  try {
    const user = await User.findByPk(responseLocals.id);
    const post = await Posts.findByPk(postid);
    if (!post || !user) throw new Error("User or post doesn't exist");
    body.userid = responseLocals.id;
    const comment = await commentInstance.createComment(body);
    return response(res, 201, "", true, comment, false);
  } catch (err) {
    return response(res, 400, `${err}`, true, null, false);
  }
};

const deleteComment: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const responseLocals: IResponseLocals = res.locals.data;
    const comment = await commentInstance.findCommentAgainstUser(
      id,
      responseLocals.id
    );
    await comment.destroy();
    await comment.save();
    return response(res, 201, "Deleted", true, null, false);
  } catch (err) {
    return response(res, 400, `${err}`, true, null, false);
  }

 };

export { createComment, deleteComment };
