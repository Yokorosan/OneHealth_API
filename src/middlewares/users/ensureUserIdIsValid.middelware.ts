import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const ensureUserIdIsValidMiddelware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepository = AppDataSource.getRepository(Users);
  const findUser = await usersRepository.findOneBy({ id: req.params.id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  return next();
};
