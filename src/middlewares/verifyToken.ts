import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { EnvConfig } from "../config";
// import APIError from "../errors/APIError";
// import httpStatus from "http-status";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization as string;
  const token = authorizationHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, EnvConfig.secretSign);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    next(error);
    // throw new APIError("Token is expired or not valid.", httpStatus.FORBIDDEN);
  }
};

export default verifyToken;
