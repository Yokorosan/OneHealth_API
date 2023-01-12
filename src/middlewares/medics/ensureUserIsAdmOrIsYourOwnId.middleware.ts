import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

export const ensureUserIsAdmOrIsYourOwnIdMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  const isAdm = req.user.isAdm;
  console.log(isAdm);
  const userMedicToDeleteOrEditId = req.params.id;

  const userThatMakesTheRequestId = req.user.id;

  if (!isAdm && userThatMakesTheRequestId !== userMedicToDeleteOrEditId) {
    throw new AppError("Missing admin authorization", 403);
  }

  return next();
};
