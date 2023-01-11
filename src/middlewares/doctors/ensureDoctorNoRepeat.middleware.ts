import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";

export const ensureDoctorNoRepeat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const doctorsRepository = AppDataSource.getRepository(UsersMedic);

  const alredyExists = await doctorsRepository.findOneBy({
    email: req.body.email,
  });

  if (alredyExists) {
    throw new AppError("Email is already in use!", 400);
  }

  return next();
};
