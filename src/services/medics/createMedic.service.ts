import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import {
  IMedic,
  IMedicRequest,
} from "../../interfaces/medics/medics.interface";

export const createMedicService = async (data: any) => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const createdMedic = medicRepository.create(data);

  await medicRepository.save(createdMedic);

  return createdMedic;
};
