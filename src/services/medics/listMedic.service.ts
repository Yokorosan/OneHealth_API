import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";

export const listMedicsService = async () => {
  //isAdm, isUser
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  // if (isAdm) {
  //   const allMedics = await medicRepository.find({
  //     withDeleted: true,
  //   });

  //   return allMedics;
  // }

  // if (isUser) {
  //   const activeMedics = await medicRepository.find();

  //   return activeMedics;
  // }

  throw new AppError("Access denied!", 403);
};
