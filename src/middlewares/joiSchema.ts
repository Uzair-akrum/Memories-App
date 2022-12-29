import Joi from "joi";
 import { IUser } from "../types/user";
const userSchema = Joi.object<IUser>({
  
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(5)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
});


 

export default userSchema;
