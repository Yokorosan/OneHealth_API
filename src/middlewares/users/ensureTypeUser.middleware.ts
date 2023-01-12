import e, { NextFunction, Request, Response } from "express";
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

  const userPatient = await userRepository.exist({
    where: {
      email: reqBody.email,
    },
  });

  const userMedic = await userMedicRepository.exist({
    where: {
      email: reqBody.email,
    },
  });

  if (!userPatient && !userMedic) {
    throw new AppError("User or password not found", 404);
  } else {
    request.body = {
      ...reqBody,
      isPatient: userPatient,
      isMedic: userMedic,
    };
  }

  return next();
};

export default ensureTypeUserMiddleware;
