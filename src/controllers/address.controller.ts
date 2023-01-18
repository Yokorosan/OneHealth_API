import { Request, Response } from "express";
import { IAddressRequest } from "../interfaces/address/address.interface";
import createAddressService from "../services/address/createAddress.service";
import updateAddressService from "../services/address/updateAddress.service";

export const createAddressController = async (req: Request, res: Response) => {
  const addressData: IAddressRequest = req.body;

  const userId = req.user.id;
  const newAddress = await createAddressService(addressData, userId);

  return res.status(201).json(newAddress);
};

export const updateAddressController = async (req: Request, res: Response) => {
  const addressData: IAddressRequest = req.body;
  const updateAddress = await updateAddressService(addressData, req.params.id);

  return res.status(200).json(updateAddress);
};
