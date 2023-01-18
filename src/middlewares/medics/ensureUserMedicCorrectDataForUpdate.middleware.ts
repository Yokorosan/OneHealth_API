import { NextFunction, Request, Response } from "express";
import { SchemaOf } from "yup";
import { AppError } from "../../errors/AppError";
import { IMedicUpdateCorrect } from "../../interfaces/medics/medics.interface";

 const ensureUserMedicCorrectDataForUpdateMiddleware =
  (serializer: SchemaOf<IMedicUpdateCorrect>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error: any) {
      throw new AppError(error.errors, 400);
    }

    return next();
  };

  export default ensureUserMedicCorrectDataForUpdateMiddleware