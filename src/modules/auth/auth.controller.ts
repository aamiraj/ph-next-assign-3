import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { higherOrderController } from "../../utils/higherOrderController";

const signUpUser = higherOrderController(
  async (req: Request, res: Response) => {
    const result = await AuthService.signUpUserToDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User registered successfully",
      data: result,
    });
  },
);

export const AuthController = {
  signUpUser,
};
