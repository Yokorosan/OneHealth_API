import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

export const ensureUserIsAdmOrIsYourOwnIdMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  const isAdm = req.user.isAdm;
<<<<<<< HEAD:src/middlewares/sessions/ensureUserIsAdmOrIsYourOwnId.middleware.ts

  const userToDeleteOrEditId = req.params.id;

  const userThatMakesTheRequestId = req.user.id;

  if (!isAdm && userThatMakesTheRequestId !== userToDeleteOrEditId) {
=======
  console.log(isAdm);
  const userMedicToDeleteOrEditId = req.params.id;

  const userThatMakesTheRequestId = req.user.id;

  if (!isAdm && userThatMakesTheRequestId !== userMedicToDeleteOrEditId) {
>>>>>>> 8c90d89eec150a75cd080b69fe012cc5721b334b:src/middlewares/medics/ensureUserIsAdmOrIsYourOwnId.middleware.ts
    throw new AppError("Missing admin authorization", 403);
  }

  return next();
};
<<<<<<< HEAD:src/middlewares/sessions/ensureUserIsAdmOrIsYourOwnId.middleware.ts

export default ensureUserIsAdmOrIsYourOwnIdMiddlware;
=======
>>>>>>> 8c90d89eec150a75cd080b69fe012cc5721b334b:src/middlewares/medics/ensureUserIsAdmOrIsYourOwnId.middleware.ts
