import express from 'express';
 const router = express.Router();
 import { createComment } from '../controllers/commentController';
 import { auth } from '../middlewares/auth';
 router.post('/',createComment);
 export default router   ;