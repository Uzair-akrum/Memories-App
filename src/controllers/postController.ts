import { Response, RequestHandler } from "express";
import sequelize from "../config/database";

import response from "../utils/response";
import { postInstance, userInstance } from "../models/index";
import { IPost, IUserPost, ISharePost } from "../types/post";
import { IResponseLocals } from "../types/user";

  const createPost: RequestHandler = async (req, res) => {
    const body: IUserPost = req.body;
    const responseLocals: IResponseLocals = res.locals.data;
    try {
      const user = await userInstance.findUserbyPk(responseLocals.id);
      if (!user) throw new Error("User not found");
      body.userid = user.dataValues.id;

      const post = await postInstance.createPost(body);
      if (!post) throw new Error(" No Post Created");

      return response(res, 201, "Post Created!", true, post, false);
    } catch (err) {
      console.log(err);

      return response(res, 400, "Error Creating Post!", false, null, true);
    }
  };
const getPost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postInstance.getPost(id);
    if (!post) throw new Error("Not able to get post");
    const likes = await post.countLikes();

    return response(res, 201, "", true, { post, likes }, false);
  } catch (err) {
    return response(res, 400, `${err}`, false, null, true);
  }
};
const getPostByUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await postInstance.getPostsByUser(id);
    if (!posts) throw new Error("No Posts by User");
    return response(res, 200, "Posts by User", true, posts, false);
  } catch (err) {
    return response(res, 400, `${err}`, false, null, true);
  }
};
const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const responseLocals: IResponseLocals = res.locals.data;

  if (!responseLocals) throw new Error("User doesnt Exist");

  try {
    const post = await postInstance.findPostAgainstUser(id, responseLocals.id);
    await post.destroy();
    await post.save();
    return response(res, 200, "Post Deleted!", true, null, false);
  } catch (err) {
    return response(res, 400, `${err}`, false, null, true);
  }
};
const search: RequestHandler = async (req, res) => {
  const { word } = req.params;
  try {
    const posts = await postInstance.searchPost(word);
    return response(res, 201, "", true, posts, false);
  } catch (err) {
    return response(res, 400, `${err}`, true, null, false);
  }
};
const sharePost: RequestHandler = async (req, res) => {
  const body: ISharePost = req.body;

  try {
    const share = await postInstance.createPost(body);
    return response(res, 201, "Shared!", true, share, false);
  } catch (err) {
    return response(res, 400, err, false, null, true);
  }
};
const updatePost: RequestHandler = async (req, res) => {
  const body: IPost = req.body;
  const { id } = req.params;
  try {
    const post = await postInstance.updatePost(body, id);
    return response(res, 201, "Updated!", true, post, false);
  } catch (err) {
    return response(res, 400, err, false, null, true);
  }
};
const sharedBy: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await postInstance.sharedBy(id);
    return response(res, 201, "All Shares", true, posts, false);
  } catch (err) {
    return response(res, 400, err, false, null, true);
  }
};

export {
  createPost,
  getPost,
  getPostByUser,
  deletePost,
  search,
  sharePost,
  updatePost,
  sharedBy,
};
