



// const createPost = async (req, res): Promise<Response> => {
//     const {  email,password } = req.body;
  
//     try {
//       const user = await User.findByPk(userid);
//      //  console.log("user", await Posts.findAll({}));
//       const post = await Posts.create({
//         title,
//         description,
//         images,
//         userid: user.dataValues.id,
//       });
  
//       return res.json(post);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   };