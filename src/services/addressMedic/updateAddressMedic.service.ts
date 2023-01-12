import AppDataSource from "../../data-source";
import { UserAddress } from "../../entities/useraddress.entity";
import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/address.interface";
import { addressRequestSchema } from "../../schemas/address.schema";

const updateAddressMedicService = async (
  addressMedicData: IAddressRequest,
  idAddressMedic: string
) => {
  const addressMedicSerializer = await addressRequestSchema.validate(
    addressMedicData,
    {
      stripUnknown: true,
      abortEarly: false,
    }
  );

  const addressMedicRepository = AppDataSource.getRepository(UserAddress);

  const addressMedic = await addressMedicRepository.findOneBy({
    id: idAddressMedic,
  });

  if (!addressMedic) {
    throw new AppError("address not found", 404);
  }

  const updateAddressMedic = addressMedicRepository.create({
    ...addressMedic,
    ...addressMedicSerializer,
  });

  await addressMedicRepository.save(updateAddressMedic);

  return updateAddressMedic;
};

export default updateAddressMedicService;
