import { NextFunction, Request, Response } from "express";
import { EnvConfig } from "../config";

export const globalErrorResponse = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const errorMessages = {
    path: "",
    message: "",
  };

  return res.json({
    success: false,
    message: error?.message,
    errorMessages: [errorMessages],
    stack: EnvConfig.environment === "development" ? error?.stack : null,
  });
};
