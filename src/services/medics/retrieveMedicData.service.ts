import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { IMedicProfileResponse } from "../../interfaces/medics/medics.interface";
import { MedicProfileWhitoutPassSchema } from "../../schemas/medics.schema";

export const retrieveMedicDataService = async (
  id: string
): Promise<IMedicProfileResponse> => {

  const queryMedicData = await AppDataSource.createQueryBuilder()
  .select("medics")
  .from(UsersMedic, "medics")
  .where("medics.id = :medicId" ,{medicId:id})
  .leftJoinAndSelect("medics.speciality", "speciality")
  .leftJoinAndSelect("medics.address", "address")
  .getOne();

  if (!queryMedicData) {
    throw new AppError("User not found!", 404);
  }

  const medicDataResponse = await MedicProfileWhitoutPassSchema.validate(
    queryMedicData,
    {
      abortEarly: false,
      stripUnknown: true,
    }
  );

  return medicDataResponse;
};
