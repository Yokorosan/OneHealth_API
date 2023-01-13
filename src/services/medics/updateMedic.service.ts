import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { IMedicResponse } from "../../interfaces/medics/medics.interface";
import { MedicWhitoutPassSchema } from "../../schemas/medics.schema";

export const updateMedicService = async (
  userMedicId: string,
  userMedicData: any
): Promise<IMedicResponse> => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const foundMedic = await medicRepository.findOneBy({
    id: userMedicId,
  });

  const updateMedic = medicRepository.create({
    ...foundMedic,
    ...userMedicData,
  });

  await medicRepository.update(userMedicId, userMedicData);

  const medicWhitoutPass = await MedicWhitoutPassSchema.validate(updateMedic, {
    stripUnknown: true,
    abortEarly: false,
  });

  return medicWhitoutPass;
};
