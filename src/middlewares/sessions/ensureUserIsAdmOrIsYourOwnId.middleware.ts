import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
const ensureUserIsAdmOrIsYourOwnIdMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;

  const userToDeleteOrEditId = req.params.id;

  const userThatMakesTheRequestId = req.user.id;

  if (!isAdm && userThatMakesTheRequestId !== userToDeleteOrEditId) {
    throw new AppError("Missing admin authorization", 403);
  }

  return next();
};

export default ensureUserIsAdmOrIsYourOwnIdMiddlware;
