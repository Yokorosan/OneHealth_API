import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/AppError";

export const ensureAddressNoRepeatMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressRepository = AppDataSource.getRepository(Address);

  const alredyExists = await addressRepository.findOne({
    where: {
      district: req.body.address.district,
      zipCode: req.body.address.zipCode,
      number: req.body.address.number,
    },
  });

  if (alredyExists) {
    throw new AppError("Address alredy exists!", 409);
  }

  return next();
};
