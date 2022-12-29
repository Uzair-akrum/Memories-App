import express from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  loginUser,
  findByEmail,
  findByUsername,
} from "../controllers/userController";
import validate from "../middlewares/validMail";
import { auth } from "../middlewares/auth";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/email/:email", findByEmail);
router.get("/username/:name", findByUsername);

router.use(validate);
router.post("/", createUser); //validate
router.post("/login", loginUser); //validate
router.use(auth);
router.delete("/:id", deleteUser); //auth
router.post("/:id", updateUser); //auth//validate

export default router;
