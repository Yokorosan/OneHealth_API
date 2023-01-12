import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import {
  IMedicResponse,
  IMedicRequest,
} from "../../interfaces/medics/medics.interface";
import { MedicWhitoutPassSchema } from "../../schemas/medics.schema";

export const createMedicService = async (
  data: any
): Promise<IMedicResponse> => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const createdMedic = medicRepository.create(data);

  await medicRepository.save(createdMedic);

  const medicWhitoutPass = await MedicWhitoutPassSchema.validate(createdMedic, {
    abortEarly: false,
    stripUnknown: true,
  });

  return medicWhitoutPass;
};
