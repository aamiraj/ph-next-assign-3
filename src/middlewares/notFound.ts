import { Request, Response } from "express";
import httpStatus from "http-status";

export const notFound = async (req: Request, res: Response) =>
  res.status(httpStatus.NOT_FOUND).json({
    status: true,
    statusCode: httpStatus.NOT_FOUND,
    message: "No route found.",
  });
