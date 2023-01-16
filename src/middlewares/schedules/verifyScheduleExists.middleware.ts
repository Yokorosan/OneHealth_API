import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { AppError } from "../../errors/AppError";

const verifyScheduleExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schedulesRepository = AppDataSource.getRepository(ScheduledAppointment);

  const scheduleExists = await schedulesRepository
    .createQueryBuilder("scheduleExist")
    .where("scheduleExist.id = :id", { id: req.params.id })
    .getOne();

  if (!scheduleExists) {
    throw new AppError("schedule doesn't exists", 404);
  }

  return next();
};

export { verifyScheduleExistsMiddleware };
