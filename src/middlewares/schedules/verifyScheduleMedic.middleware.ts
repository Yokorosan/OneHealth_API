import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";

const verifyScheduleMedicMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schedulesRepository = AppDataSource.getRepository(ScheduledAppointment);
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const medic = await medicRepository.findOneBy({
    id: req.body.medic,
  });

  if (!medic) {
    throw new AppError("Unregistered medic", 404);
  }

  const schedulesMedicExists = await schedulesRepository
    .createQueryBuilder("scheduled_appointment")
    .innerJoinAndSelect("scheduled_appointment.medic", "medic")
    .where("scheduled_appointment.userId = :id", {
      id: req.body.medic,
    })
    .andWhere("scheduled_appointment.date = :date", {
      date: req.body.date,
    })
    .andWhere("scheduled_appointment.hour = :hour", {
      hour: req.body.hour,
    })
    .getOne();

  if (schedulesMedicExists) {
    throw new AppError("Medic alredy has an Appointment in this date", 409);
  }

  return next();
};

export { verifyScheduleMedicMiddleware };
