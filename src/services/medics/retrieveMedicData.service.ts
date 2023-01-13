import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { IMedicResponse } from "../../interfaces/medics/medics.interface";
import { MedicWhitoutPassSchema } from "../../schemas/medics.schema";

export const retrieveMedicDataService = async (
  id: string
): Promise<IMedicResponse> => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  // const medicData = await medicRepository.findOneBy({
  //   id: id,
  // });
  // console.log(medicData);

  const queryMedicData = await medicRepository
    .createQueryBuilder("user_medic")
    .where("user_medic.id = :id", { id: id })
    .leftJoinAndSelect("user_medic.address", "address")
    .leftJoin("user_medic.speciality", "speciality")
    .addSelect(["speciality.name"])
    .getMany();

  if (!queryMedicData) {
    throw new AppError("User not found!", 404);
  }

  const medicDataResponse = await MedicWhitoutPassSchema.validate(
    queryMedicData,
    {
      abortEarly: false,
      stripUnknown: true,
    }
  );
  console.log(medicDataResponse);
  return medicDataResponse;
};
