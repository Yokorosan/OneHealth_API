import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
const ensureUserIsAdmOrIsYourOwnIdMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;
  console.log(isAdm)
  const userMedicToDeleteOrEditId = req.params.id;
  const userThatMakesTheRequestId = req.user.id;
  if (!isAdm && userThatMakesTheRequestId !== userMedicToDeleteOrEditId) {
    throw new AppError("Missing admin authorization", 403);
  }
  return next();
};
export default ensureUserIsAdmOrIsYourOwnIdMiddlware;
