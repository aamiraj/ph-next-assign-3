import { Response } from "express";
import { IResponseBody } from "../interfaces/ResponseBody";

export const sendResponse = (res: Response, body: IResponseBody) => {
  return res.send({
    success: body.success,
    statusCode: body.statusCode,
    message: body.message,
    data: body.data,
  });
};
