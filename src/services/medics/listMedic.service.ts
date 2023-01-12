import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";

export const listMedicsService = async () => {
  //isAdm, isUser
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  // let allMedics = []

  // if (isAdm) {
  //   allMedics = await medicRepository.find({
  //     withDeleted: true,
  //   });
  // } else {
  //   allMedics = await medicRepository.find();
  // }

  // return allMedics;
};
