import { NextFunction, Request, RequestHandler, Response } from "express";

export const higherOrderController =
  (func: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch((error) => next(error));
