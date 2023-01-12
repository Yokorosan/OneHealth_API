import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/address.interface";
import { addressRequestSchema } from "../../schemas/address.schema";

const updateAddressService = async (
  addressData: IAddressRequest,
  idAddress: string
) => {
  try {
    await addressRequestSchema.validate(addressData, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch {
    throw new AppError("invalid fields", 404);
  }

  const addressRepository = AppDataSource.getRepository(Address);

  const address = await addressRepository.findOneBy({
    id: idAddress,
  });

  if (!address) {
    throw new AppError("address not found", 404);
  }

  const updateAddress = addressRepository.create({
    ...address,
    ...addressData,
  });

  await addressRepository.save(updateAddress);

  return updateAddress;
};

export default updateAddressService;
