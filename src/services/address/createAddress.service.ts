import AppDataSource from "../../data-source";
import { UserAddress } from "../../entities/useraddress.entity";
import { addressRequestSchema } from "../../schemas/address.schema";
import { IAddressRequest } from "../../interfaces/address.interface";

const createAddressService = async (addressData: IAddressRequest) => {
  const addressSerializer = await addressRequestSchema.validate(addressData, {
    stripUnknown: true,
    abortEarly: false,
  });

  const addressRepository = AppDataSource.getRepository(UserAddress);

  const createAddress = addressRepository.create(addressSerializer);

  await addressRepository.save(createAddress);

  return createAddress;
};

export default createAddressService;
