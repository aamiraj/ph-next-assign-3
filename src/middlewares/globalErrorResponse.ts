import { NextFunction, Request, Response } from "express";
import { EnvConfig } from "../config";
import { ZodError } from "zod";
import { ErrorMessages } from "../interfaces/ErrorMessage";
import mongoose from "mongoose";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import httpStatus from "http-status";

interface TSimplifiedError {
  messages: ErrorMessages;
  statusCode: number
}

export const globalErrorResponse = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const errorMessages: TSimplifiedError = buildSimplifiedError(error);

  const statusCode = errorMessages?.statusCode || error?.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error?.message,
    errorMessages: errorMessages?.messages,
    stack: EnvConfig.environment === "development" ? error?.stack : null,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildSimplifiedError = (error: any) => {
  if (error instanceof ZodError) {
    const errorMessages = error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }));

    return { messages: errorMessages, statusCode: httpStatus.INTERNAL_SERVER_ERROR };
  } else if (error instanceof mongoose.Error.CastError) {
    const errorMessages = { path: error.path, message: error.message };

    return { messages: errorMessages, statusCode: httpStatus.INTERNAL_SERVER_ERROR };
  } else if (error instanceof mongoose.Error.ValidatorError) {
    const errorMessages = { path: error.path, message: error.message };

    return { messages: errorMessages, statusCode: httpStatus.INTERNAL_SERVER_ERROR };
  } else if (error?.code === 11000) {
    const errorMessages = { path: "", message: error.message };

    return { messages: errorMessages, statusCode: httpStatus.INTERNAL_SERVER_ERROR };
  } else if (error instanceof TokenExpiredError) {
    const errorMessages = { path: "", message: "Token is expired." };

    return { messages: errorMessages, statusCode: httpStatus.UNAUTHORIZED };
  } else if (error instanceof JsonWebTokenError) {
    const errorMessages = { path: "", message: "Token is invalid." };

    return { messages: errorMessages, statusCode: httpStatus.UNAUTHORIZED };
  }

  const errorMessages = {
    path: "",
    message: "",
  };
  return { messages: errorMessages, statusCode: httpStatus.INTERNAL_SERVER_ERROR };
};
