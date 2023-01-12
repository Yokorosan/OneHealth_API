import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { AppError } from "../../errors/AppError";

const ensureUserIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adm = req.user.isAdm;

  if (!adm) {
    throw new AppError("Route allowed only for admins", 403);
  }

  return next();
};

export { ensureUserIsAdmMiddleware };
