import express from "express";
import {
  createPost,
  getPost,
  getPostByUser,
  deletePost,
  search,
  sharePost,
  updatePost,
  sharedBy,
} from "../controllers/postController";
import { likePost } from "../controllers/likeController";
import { createComment, deleteComment } from "../controllers/commentController";
import { auth } from "../middlewares/auth";

const router = express.Router();
router.get("/:id", getPost);
router.get("/user/:id", getPostByUser);
router.post("/search/:word", search);
router.get("/sharedby/:id", sharedBy);
router.use(auth);
router.post("/", createPost);
router.post("/comment", createComment);
router.delete("/comment/:id", deleteComment);
router.delete("/:id", deletePost);
router.post("/like/:id", likePost);
router.post("/share", sharePost);
router.post("/:id", updatePost);

export default router;
