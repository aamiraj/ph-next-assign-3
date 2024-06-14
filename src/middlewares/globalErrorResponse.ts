import { NextFunction, Request, Response } from "express";
import { EnvConfig } from "../config";
import { ZodError } from "zod";
import { ErrorMessages } from "../interfaces/ErrorMessage";
import mongoose from "mongoose";

export const globalErrorResponse = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const errorMessages: ErrorMessages = buildSimplifiedError(error);

  const statusCode = error?.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error?.message,
    errorMessages: errorMessages,
    stack: EnvConfig.environment === "development" ? error?.stack : null,
  });
};

const buildSimplifiedError = (error: unknown) => {
  if (error instanceof ZodError) {
    const errorMessages = error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }));

    return errorMessages;
  } else if (error instanceof mongoose.Error.CastError) {
    const errorMessages = { path: error.path, message: error.message };

    return errorMessages;
  } else if (error instanceof mongoose.Error.ValidatorError) {
    const errorMessages = { path: error.path, message: error.message };

    return errorMessages;
  }

  const errorMessages = {
    path: "",
    message: "",
  };
  return errorMessages;
};
