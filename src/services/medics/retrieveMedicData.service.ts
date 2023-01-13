import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { IMedicProfileResponse, IMedicResponse } from "../../interfaces/medics/medics.interface";
import { MedicProfileWhitoutPassSchema, MedicWhitoutPassSchema } from "../../schemas/medics.schema";

export const retrieveMedicDataService = async (
  id: string
): Promise<IMedicProfileResponse> => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  // const medicData = await medicRepository.findOneBy({
  //   id: id,
  // });
  // console.log(medicData);

  // const queryMedicData = await medicRepository
  //   .createQueryBuilder("user_medic")
  //   .where("user_medic.id = :id", { id: id })
  //   .leftJoinAndSelect("user_medic.address", "address")
  //   .leftJoin("user_medic.speciality", "speciality")
  //   .addSelect(["speciality.name"])
  //   .getMany();

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
