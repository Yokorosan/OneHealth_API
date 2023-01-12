import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { IMedicUpdate } from "../../interfaces/medics/medics.interface";
const updateUserMedicService = async (
  userMedicId: string,
  userMedicData: any
) => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const foundMedic = await medicRepository.findOneBy({
    id: userMedicId,
  });

  const updateMedic = medicRepository.create({
    ...foundMedic,
    ...userMedicData,
  });

  await medicRepository.save(updateMedic);

  return updateMedic;
};
export default updateUserMedicService;
