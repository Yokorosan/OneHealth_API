import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureCantUpdateUserFieldMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateDiagnosticData = req.body;

  if (
    typeof updateDiagnosticData.user === "string" ||
    typeof updateDiagnosticData.user === "number" ||
    typeof updateDiagnosticData.user === "boolean"
  ) {
    throw new AppError("Cannot update this fields!", 401);
  }

  return next()
};
export default ensureCantUpdateUserFieldMiddleware
