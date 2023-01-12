import { Request, Response } from "express";
import { IAddressRequest } from "../interfaces/address.interface";
import updateAddressMedicService from "../services/addressMedic/updateAddressMedic.service";

export const updateAddressMedicController = async (
  req: Request,
  res: Response
) => {
  const addressMedicData: IAddressRequest = req.body;
  const updateAddressMedic = await updateAddressMedicService(
    addressMedicData,
    req.params.id
  );

  return res.status(200).json(updateAddressMedic);
};
