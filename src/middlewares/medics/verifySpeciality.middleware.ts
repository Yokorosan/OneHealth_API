import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Speciality } from "../../entities/speciality.entity";

export const verifySpecialityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const specialityRepository = AppDataSource.getRepository(Speciality);

  const alredyExists = await specialityRepository.findOneBy({
    name: req.body.speciality,
  });

  if (alredyExists) {
    req.body.speciality = alredyExists.id;

    return next();
  }

  const data = {
    name: req.body.speciality,
  };

  const createdSpeciality = specialityRepository.create(data);

  const specialityId = await specialityRepository.save(createdSpeciality);

  req.body.speciality = specialityId.id;

  return next();
};
