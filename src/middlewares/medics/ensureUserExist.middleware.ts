import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
const ensureUserMedicExistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userMedicRepository = AppDataSource.getRepository(UsersMedic);
  const userMedicToDeleteOrEditId = req.params.id;
  const findUserMedicToDeleteOrEditId = userMedicRepository.findOneBy({
    id: userMedicToDeleteOrEditId,
  });
  if (!findUserMedicToDeleteOrEditId) {
    throw new AppError("User not found!", 404);
  }
  return next;
};
export default ensureUserMedicExistMiddleware;
