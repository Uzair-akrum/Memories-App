import express from 'express';
import { createPost,getPost,getPostByUser,deletePost } from '../controllers/postController';
import { createComment } from '../controllers/commentController';
import {auth} from "../middlewares/auth"
const router = express.Router();

 router.post('/',auth,createPost);
 router.get('/:id',getPost);
 router.get('/user/:id',getPostByUser);
 router.post('/comment',auth,createComment);
 router.delete('/:id',deletePost);
    


 export default router   ;