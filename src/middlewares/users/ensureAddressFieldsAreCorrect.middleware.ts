import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureQuantityOfCharactersMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUserData = req.body;
  const newUserAddressData = req.body.address;

  if (
    newUserData.name.length > 75 ||
    newUserData.email.length > 100 ||
    newUserData.email.length > 15 ||
    newUserAddressData.district.length > 200 ||
    newUserAddressData.zipCode.length > 8 ||
    newUserAddressData.number.length > 5 ||
    newUserAddressData.city.length > 50 ||
    newUserAddressData.state.length > 2
  ) {

    throw new AppError("Invalid field lenghts!", 400)
  }

  return next()
};

export default ensureQuantityOfCharactersMiddleware