import AppDataSource from "../../data-source";
import { UserAddress } from "../../entities/useraddress.entity";
import { addressRequestSchema } from "../../schemas/address.schema";
import { IAddressRequest } from "../../interfaces/address/address.interface";
import { AppError } from "../../errors/AppError";

const createAddressService = async (addressData: IAddressRequest) => {
  try {
    await addressRequestSchema.validate(addressData, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch {
    throw new AppError("invalid fields", 403);
  }

  const addressRepository = AppDataSource.getRepository(UserAddress);

  const createAddress = addressRepository.create(addressData);

  await addressRepository.save(createAddress);

  return createAddress;
};

export default createAddressService;
