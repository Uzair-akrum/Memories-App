import express from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  deleteAllUser,
  loginUser,
} from "../controllers/userController";
import validate from "../middlewares/validMail";
import { auth } from "../middlewares/auth";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", validate, createUser);
router.delete("/", deleteAllUser);

router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.post("/login", validate, loginUser);

router.post("/:id", validate, updateUser);

export default router;
