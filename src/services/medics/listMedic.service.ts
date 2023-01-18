import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { IMedicProfileResponse } from "../../interfaces/medics/medics.interface";
import { GetMedicsSchema } from "../../schemas/medics.schema";

export const listMedicsService = async (isAdm: boolean, isMedic: boolean) => {
  let allMedics: IMedicProfileResponse[] = [];

  if (isAdm) {
    allMedics = await AppDataSource.createQueryBuilder()
      .withDeleted()
      .select("medics")
      .from(UsersMedic, "medics")
      .leftJoinAndSelect("medics.speciality", "speciality")
      .leftJoinAndSelect("medics.address", "address")
      .getMany();

    const medicsWithoutPassword = await GetMedicsSchema.validate(allMedics, {
      abortEarly: false,
      stripUnknown: true,
    });

    return medicsWithoutPassword;
  }

  if (!isMedic) {
    allMedics = await AppDataSource.createQueryBuilder()
      .select("medics")
      .from(UsersMedic, "medics")
      .leftJoinAndSelect("medics.speciality", "speciality")
      .leftJoinAndSelect("medics.address", "address")
      .getMany();

    const medicsWithoutPassword = await GetMedicsSchema.validate(allMedics, {
      abortEarly: false,
      stripUnknown: true,
    });

    return medicsWithoutPassword;
  } else {
    throw new AppError("Access denied!", 403);
  }
};
