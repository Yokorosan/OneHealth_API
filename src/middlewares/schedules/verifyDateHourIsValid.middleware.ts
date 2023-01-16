import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const verifyDateHourIsValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const day = new Date(req.body.date);

  console.log(day);

  if (day.getDay() === 0 || day.getDay() === 6) {
    throw new AppError("Invalid Data", 400);
  }

  if (
    req.body.hour.split(":")[0] < 8 ||
    (req.body.hour.split(":")[0] == 18 && req.body.hour.split(":")[1] > 0) ||
    req.body.hour.split(":")[0] > 18
  ) {
    throw new AppError("Invalid Data", 400);
  }

  return next();
};

export default verifyDateHourIsValidMiddleware;
