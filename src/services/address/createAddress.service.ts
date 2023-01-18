import AppDataSource from "../../data-source";
import { UserAddress } from "../../entities/useraddress.entity";
import { addressRequestSchema } from "../../schemas/address.schema";
import { IAddressRequest } from "../../interfaces/address/address.interface";
import { AppError } from "../../errors/AppError";
import { Users } from "../../entities/user.entity";

const createAddressService = async (
  addressData: IAddressRequest,
  userId: string
) => {
  try {
    await addressRequestSchema.validate(addressData, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch {
    throw new AppError("invalid fields", 403);
  }

  const addressRepository = AppDataSource.getRepository(UserAddress);

  const userRepository = AppDataSource.getRepository(Users);

  const createAddress = addressRepository.create(addressData);

  await addressRepository.save(createAddress);

  await userRepository.update(
    {
      id: userId,
    },
    {
      address: createAddress,
    }
  );

  return createAddress;
};

export default createAddressService;
