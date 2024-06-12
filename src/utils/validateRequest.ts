import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req);

    if (!result.success) {
      next(result.error);
    } else {
      next();
    }
  };
