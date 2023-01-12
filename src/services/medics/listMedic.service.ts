import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";

export const listMedicsService = async () => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const medics = await medicRepository.find();

  return medics;
};
