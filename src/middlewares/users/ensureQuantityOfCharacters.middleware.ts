import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureAddressFieldsAreCorrectMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUserAddressData = req.body.address;

  if (typeof newUserAddressData === "object") {
    if (
      !newUserAddressData.district ||
      !newUserAddressData.zipCode ||
      !newUserAddressData.number ||
      !newUserAddressData.city ||
      !newUserAddressData.state
    ) {
        throw new AppError("Invalid address fields!", 400)
    }
  }

  return next();
};

export default ensureAddressFieldsAreCorrectMiddleware;
