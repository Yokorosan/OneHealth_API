import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const ensureValidData =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validetedData = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = validetedData;

      return next();
    } catch (error: any) {
      return res.status(400).json({ error: error.errors });
    }
  };
