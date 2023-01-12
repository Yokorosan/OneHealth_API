import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const ensureUsersNoRepeatMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepository = AppDataSource.getRepository(Users);

  const alredyExists = await usersRepository.findOneBy({
    email: req.body.email,
  });

  if (alredyExists) {
    throw new AppError("Email is already in use!", 400);
  }

  return next();
};
