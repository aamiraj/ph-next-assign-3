import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.signUpUserToDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  signUpUser,
};
