import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { AppError } from "../../errors/AppError";

const verifyScheduleOwnershipOrAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schedulesRepository = AppDataSource.getRepository(ScheduledAppointment);

  const scheduleExistsMedic = await schedulesRepository
    .createQueryBuilder("scheduleExist")
    .where("scheduleExist.id = :id", { id: req.params.id })
    .innerJoinAndSelect("scheduleExist.medic", "medic")
    .where("scheduleExist.medicId = :id", { id: req.user.id })
    .getOne();

  const scheduleExistsUser = await schedulesRepository
    .createQueryBuilder("scheduleExist")
    .where("scheduleExist.id = :id", { id: req.params.id })
    .innerJoinAndSelect("scheduleExist.user", "user")
    .where("scheduleExist.userId = :id", { id: req.user.id })
    .getOne();

  if (!scheduleExistsMedic && !scheduleExistsUser && req.user.isAdm === false) {
    throw new AppError("You don't have permission", 403);
  }

  return next();
};

export { verifyScheduleOwnershipOrAdminMiddleware };
