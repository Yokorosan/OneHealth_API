import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const verifyScheduleUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schedulesRepository = AppDataSource.getRepository(ScheduledAppointment);
  const patientRepository = AppDataSource.getRepository(Users);

  const patient = await patientRepository.findOneBy({
    id: req.body.user,
  });

  if (!patient) {
    throw new AppError("Unregistered patient", 404);
  }

  const schedulesPatientExists = await schedulesRepository
    .createQueryBuilder("scheduled_appointment")
    .innerJoinAndSelect("scheduled_appointment.user", "user")
    .where("scheduled_appointment.userId = :id", {
      id: req.body.user,
    })
    .andWhere("scheduled_appointment.date = :date", {
      date: req.body.date,
    })
    .andWhere("scheduled_appointment.hour = :hour", {
      hour: req.body.hour,
    })
    .getOne();
 
  if (schedulesPatientExists) {
    throw new AppError("Patient alredy has an Appointment in this date", 409);
  }

  return next();
};

export { verifyScheduleUserMiddleware };
