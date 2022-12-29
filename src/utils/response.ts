import { Response } from "express-serve-static-core";

const response = (
  res: Response,
  status: number,
  msg: string,
  success: boolean,
  body: object ,
  err: boolean
) => {
  return res.status(status).json({
    msg: msg,
    success: success,
    body: body,
    err: err,
  });
};
export default response;
