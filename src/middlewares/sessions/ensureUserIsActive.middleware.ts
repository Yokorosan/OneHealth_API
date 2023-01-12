import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users/user.interface";

const ensureTypeUserMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Users);
  const userMedicRepository = AppDataSource.getRepository(UsersMedic);
  const reqBody: IUserLogin = request.body;
  console.log(request.body);
  const userPatient = await userRepository.find({
    withDeleted: true,
    where: {
      email: reqBody.email,
      isActive: false,
    },
  });
  console.log(userPatient);
  const userMedic = await userMedicRepository.find({
    withDeleted: true,
    where: {
      email: reqBody.email,
      isActive: false,
    },
  });
  console.log(userMedic);
  if (userPatient.length > 0 || userMedic.length > 0) {
    throw new AppError("User or password not found redux", 400);
  }

  return next();
};

export default ensureTypeUserMiddleware;
