import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { IMedic } from "../../interfaces/medics/medics.interface";

export const listMedicsService = async () => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const medics = await medicRepository.find();

  return medics;
};
