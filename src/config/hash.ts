import bcrypt, { hash } from "bcryptjs";

const saltround = 5;

const hash = (password, res) => {
  bcrypt.hash(password, saltround, (error: any, hash: string) => {
    if (error) {
      res.send({
        success: false,
        statusCode: 500,
        message: "Getting error during the connection",
      });

      return;
    } else {
      console.log("else");
      return hash;
    }
  });
};

export default hash;
