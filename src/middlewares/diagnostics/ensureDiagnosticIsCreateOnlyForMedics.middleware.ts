import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

const ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRequestId = req.user.isMedic;

  if (userRequestId === false) {
    throw new AppError("Access denied, medic permission required!", 401);
  }

  return next();
};

export default ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware;
