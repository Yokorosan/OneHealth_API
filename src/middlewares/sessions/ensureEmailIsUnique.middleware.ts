import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";

const ensureEmailIsUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const medicRepo = AppDataSource.getRepository(UsersMedic);
  const userRepo = AppDataSource.getRepository(Users);

  let checkEmail = false;
  const email = req.body.email;

  if (email) {
    const existEmail = await userRepo.findOneBy({ email: email });
    const existEmailMedic = await medicRepo.findOneBy({ email: email });
    if (existEmail || existEmailMedic) {
      checkEmail = true;
    }
  }
  if (checkEmail === true) {
    throw new AppError("Email is Alredy bein used", 409);
  }
  return next();
};

export { ensureEmailIsUniqueMiddleware };
