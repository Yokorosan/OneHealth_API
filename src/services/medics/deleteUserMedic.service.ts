import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
const deleteUserMedicService = async (userMedicId: string) => {
  const userMedicRepository = AppDataSource.getRepository(UsersMedic);

  const userMedic = await userMedicRepository.findOneBy({
    id: userMedicId,
  });

  const deleteUserMedic = await userMedicRepository.softRemove(userMedic!);

  const userMedicDeleted = await userMedicRepository.save({
    ...deleteUserMedic,
    isActive: false,
  });

  return userMedicDeleted;
};
export default deleteUserMedicService;
