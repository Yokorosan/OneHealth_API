import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { IAddressRequest } from "../../interfaces/address.interface";
import { addressRequestSchema } from "../../schemas/address.schema";

const createAddressService = async (addressData: IAddressRequest) => {
  const addressSerializer = await addressRequestSchema.validate(addressData, {
    stripUnknown: true,
    abortEarly: false,
  });

  const addressRepository = AppDataSource.getRepository(Address);

  const createAddress = addressRepository.create(addressSerializer);

  await addressRepository.save(createAddress);

  return createAddress;
};

export default createAddressService;
