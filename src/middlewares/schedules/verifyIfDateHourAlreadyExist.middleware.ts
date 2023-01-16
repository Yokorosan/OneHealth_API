import { NextFunction, Request, Response } from "express";
import dataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { AppError } from "../../errors/AppError";

export const verifyIfDateHourAlreadyExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scheduleRepo = dataSource.getRepository(ScheduledAppointment);
  const scheduleExistMedic = await scheduleRepo
    .createQueryBuilder("scheduleExist")
    .innerJoinAndSelect("scheduleExist.medic", "medic")
    .where("scheduleExist.id = :id ", { id: req.params.id })
    .where("scheduleExist.date = :date", {
      date: req.body.date,
    })
    .andWhere("scheduleExist.hour = :hour", {
      hour: req.body.hour,
    })
    .getOne();

  const scheduleExistUser = await scheduleRepo
    .createQueryBuilder("scheduleExist")
    .innerJoinAndSelect("scheduleExist.user", "user")
    .where("scheduleExist.id = :id ", { id: req.params.id })
    .where("scheduleExist.date = :date", {
      date: req.body.date,
    })
    .andWhere("scheduleExist.hour = :hour", {
      hour: req.body.hour,
    })
    .getOne();

  
  if (scheduleExistMedic || scheduleExistUser) {
    throw new AppError("already has a schedule for this date", 409);
  }
  return next();
};
