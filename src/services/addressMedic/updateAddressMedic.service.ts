import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { UserAddress } from "../../entities/useraddress.entity";
import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/address.interface";
import { addressRequestSchema } from "../../schemas/address.schema";

const updateAddressMedicService = async (
  addressMedicData: IAddressRequest,
  idAddressMedic: string
) => {
  try {
    await addressRequestSchema.validate(addressMedicData, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch {
    throw new AppError("invalid fields", 403);
  }

  const addressMedicRepository = AppDataSource.getRepository(Address);

  const addressMedic = await addressMedicRepository.findOneBy({
    id: idAddressMedic,
  });

  if (!addressMedic) {
    throw new AppError("address not found", 404);
  }

  const updateAddressMedic = addressMedicRepository.create({
    ...addressMedic,
    ...addressMedicData,
  });

  await addressMedicRepository.save(updateAddressMedic);

  return updateAddressMedic;
};

export default updateAddressMedicService;
