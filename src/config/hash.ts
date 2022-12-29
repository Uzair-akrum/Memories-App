import bcrypt, { hash } from "bcryptjs";

const saltround = 10;

const hashed = (password, res) => {
  return bcrypt.hash(password, saltround);
};
// bcrypt.hash(
//   password,
//   saltround,
//   async (error: any, hash: string): Promise<Response> => {
//     if (error) {
//       return response(res, 500, `${error}`, false, null, true);
//     } else {
//       try {
//         const user: object = await User.create({
//           username,
//           email,
//           password: hash,
//         });

//         return response(res, 201, "User Created!", true, user, false);
//       } catch (err) {
//         return response(res, 500, err, false, null, true);
//       }
//     }
//   }
// );

export default hashed;
