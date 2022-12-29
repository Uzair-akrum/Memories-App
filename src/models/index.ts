 import User from "./userModel";
import Posts from "./postModel";
import Comments from "./commentsModel";
import Likes from "./likeModel";
 const userInstance=new User();
 const postInstance=new Posts();
 const likeInstance=new Likes()
 const commentInstance=new Comments();
export {userInstance,postInstance,commentInstance,likeInstance}; 


