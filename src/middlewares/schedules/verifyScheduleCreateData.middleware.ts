import { NextFunction, Request, Response } from "express";
import { SchemaOf } from "yup";
import { AppError } from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules/schedules.interface";

const verifyScheduleCreateDataMiddleware =
  (serializer: SchemaOf<IScheduleRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
      req.body = validatedData;
      return next();
    } catch (error: any) {
      throw new AppError(error.errors, 400);
    }
  };

export { verifyScheduleCreateDataMiddleware };
