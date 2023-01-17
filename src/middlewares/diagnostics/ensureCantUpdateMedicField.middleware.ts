import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureCantUpdateMedicFieldMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateDiagnosticData = req.body;

  if (
    typeof updateDiagnosticData.medic === "string" ||
    typeof updateDiagnosticData.medic === "number" ||
    typeof updateDiagnosticData.medic === "boolean"
  ) {
    throw new AppError("Cannot update this fields!", 401);
  }

  return next()
};
export default ensureCantUpdateMedicFieldMiddleware