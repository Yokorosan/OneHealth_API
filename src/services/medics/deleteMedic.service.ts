import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";

export const deleteMedicService = async (userMedicId: string) => {
  const userMedicRepository = AppDataSource.getRepository(UsersMedic);

  const userMedic = await userMedicRepository.findOneBy({
    id: userMedicId,
  });

  await userMedicRepository.softRemove(userMedic!);

  const userMedicDeleted = await userMedicRepository.save({
    ...userMedic,
    isActive: false,
  });

  return userMedicDeleted;
};
