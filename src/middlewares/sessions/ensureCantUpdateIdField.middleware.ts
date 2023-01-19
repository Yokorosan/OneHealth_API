import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureCantUpdateIdFieldMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateMedicData = req.body.id;

  if (typeof(updateMedicData) === "string" || typeof(updateMedicData) === "boolean" || typeof(updateMedicData) === "number") {
    throw new AppError("Cannot update this fields!", 401);
  }

  next();
};

export default ensureCantUpdateIdFieldMiddleware