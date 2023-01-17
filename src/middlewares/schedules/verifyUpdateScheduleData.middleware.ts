import { NextFunction, Request, Response } from "express";
import { SchemaOf } from "yup";
import { AppError } from "../../errors/AppError";
import { IScheduleUpdateRequest } from "../../interfaces/schedules/schedules.interface";

export const verifyUpdateScheduleDataMiddleware =
  (serializer: SchemaOf<IScheduleUpdateRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
      req.body = validated;
      return next();
    } catch (error: any) {
      throw new AppError(error.errors, 400);
    }
  };
