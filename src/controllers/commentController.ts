import Comments from "../models/commentsModel";
import User from "../models/userModel";
import Posts from "../models/postModel";

const createComment = async (req, res): Promise<Response> => {
    console.log('createComm')
  const { postid, commentText, userid } = req.body;

  try {

    const user = await User.findByPk(userid);
    const post = await Posts.findByPk(postid);
 if(!post || !user)   throw new Error('User or post doesnt exist');

    const comment = await Comments.create({
    body: commentText,
      userid:  user.dataValues.id,
      postid: post.dataValues.id,
    });
    return res.json(comment);
  } catch (err) {
    return res.status(500).json(`${err}`);
  }
};

export { createComment };
