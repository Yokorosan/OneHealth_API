import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureCantUpdateIsActiveFieldMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateMedicData = req.body;

  if (updateMedicData.isActive === true || updateMedicData.isActive === false) {
    throw new AppError("Cannot update this fields!", 401);
  }

  next();
};

export default ensureCantUpdateIsActiveFieldMiddleware