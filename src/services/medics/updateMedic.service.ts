import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { UsersMedic } from "../../entities/usermedic.entity";
import { IMedicResponse } from "../../interfaces/medics/medics.interface";
import { MedicWhitoutPassSchema } from "../../schemas/medics.schema";

export const updateMedicService = async (
  userMedicId: string,
  userMedicData: any
): Promise<IMedicResponse> => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);
  const addressRepository = AppDataSource.getRepository(Address)

  const newMedicData = {
  name: userMedicData?.name,
  email: userMedicData?.email,
  password:userMedicData?.password,
  phone: userMedicData?.phone,
  isWhatsApp: userMedicData?.isWhatsApp,
  speciality: userMedicData?.speciality
  }

  const newMedicAddress = {
    district: userMedicData.address?.district,
    zipCode: userMedicData.address?.zipCode,
    number: userMedicData.address?.number,
    city: userMedicData.address?.city,
    state: userMedicData.address?.state
  }

  const foundMedic = await medicRepository.findOneBy({
    id: userMedicId,
  });

  const updateMedic = medicRepository.create({
    ...foundMedic,
    ...newMedicData,
  });

  await medicRepository.update(userMedicId, newMedicData);
  
  const medicAddressId:any = foundMedic?.address

  const foundAddress = await addressRepository.findOneBy({
    id:medicAddressId
  })

  const updateAddress = medicRepository.create({
    ...foundAddress,
    ...newMedicAddress,
  });

  await addressRepository.update(foundAddress!.id, newMedicAddress)

  const medicWhitoutPass = await MedicWhitoutPassSchema.validate(updateMedic, {
    stripUnknown: true,
    abortEarly: false,
  });

  return medicWhitoutPass;
};
