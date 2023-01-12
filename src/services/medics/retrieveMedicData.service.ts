import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { IMedicResponse } from "../../interfaces/medics/medics.interface";
import { MedicWhitoutPassSchema } from "../../schemas/medics.schema";

export const retrieveMedicDataService = async (
  id: string
): Promise<IMedicResponse> => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const medicData = await medicRepository.findOneBy({
    id: id,
  });

  if (!medicData) {
    throw new AppError("User not found!", 404);
  }

  const medicDataResponse = await MedicWhitoutPassSchema.validate(medicData, {
    abortEarly: false,
    stripUnknown: true,
  });

  return medicDataResponse;
};
