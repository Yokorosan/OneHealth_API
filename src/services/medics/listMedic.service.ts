import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";

export const listMedicsService = async (isAdm: boolean, isMedic: boolean) => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  let allMedics = [];

  if (isAdm) {
    allMedics = await medicRepository.find({
      withDeleted: true,
    });
    return allMedics
  }

  if (!isMedic) {
    allMedics = await medicRepository.find();
  } else {
    throw new AppError("Access denied!", 403);
  }

  return allMedics;
};
