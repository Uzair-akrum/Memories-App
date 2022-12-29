import express from 'express';
 const router = express.Router();
 import { createComment } from '../controllers/commentController';
 router.route('/').post(createComment);
 export default router   ;