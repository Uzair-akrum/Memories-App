import User from "../models/userModel";
import Posts from "../models/postModel";
import Comments from "../models/commentsModel";
import Likes from "../models/likeModel";
import Shares from "../models/shareModel";
const asssociate = async () => {
  await User.associate({ Posts, Comments, Likes, Shares });
  await Likes.associate({ Posts, User });
  await Posts.associate({ Comments, Likes, User, Shares });
  await Comments.associate({ Posts, User });
  await Shares.associate({ Posts, User });
};
export default asssociate;
