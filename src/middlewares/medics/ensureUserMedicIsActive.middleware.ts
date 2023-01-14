import { Request, Response, NextFunction } from "express";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
const ensureUserMedicIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userMedicRepository = AppDataSource.getRepository(UsersMedic);
  const userMedicToDeleteOrEditId = req.params.id;

  const findAllUsersMedic = await userMedicRepository.find({
    withDeleted:true
  });

  const findUserMedicToDeleteOrEdit = findAllUsersMedic.find((medic) => medic.id === userMedicToDeleteOrEditId);

  if (findUserMedicToDeleteOrEdit?.isActive === false) {
    throw new AppError("User is already inactive!", 400);
  }
  return next();
};
export default ensureUserMedicIsActiveMiddleware;