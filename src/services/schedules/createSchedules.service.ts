import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules/schedules.interface";
import { IUserToken } from "../../interfaces/users/user.interface";
import { schedulesRequestSchema } from "../../schemas/schedules.schema";

const createSchedulesService = async (
  schedulesData: IScheduleRequest,
  medicId: IUserToken
) => {
  const validated = await schedulesRequestSchema.validate(schedulesData, {
    stripUnknown: true,
    abortEarly: false,
  });

  const schedulesRepository = AppDataSource.getRepository(ScheduledAppointment);

  const patientRepository = AppDataSource.getRepository(Users);

  const patient = await patientRepository.findOneBy({
    id: schedulesData.userId,
  });

  if (medicId.isMedic === false) {
    throw new AppError("Only doctors can make appointments", 401);
  }

  if (!patient) {
    throw new AppError("Unregistered patient", 404);
  }

  const schedulesMedicExists = await schedulesRepository
    .createQueryBuilder("scheduled_appointment")
    .innerJoinAndSelect("scheduled_appointment.medic", "medic")
    .where("scheduled_appointment.date = date", {
      date: schedulesData.date,
    })
    .orWhere("scheduled_appointment.hour = hour", {
      hour: schedulesData.hour,
    })
    .getOne();

  const schedulesPatientExists = await schedulesRepository
    .createQueryBuilder("scheduled_appointment")
    .innerJoinAndSelect("scheduled_appointment.user", "user")
    .where("scheduled_appointment.date = date", {
      date: schedulesData.date,
    })
    .orWhere("scheduled_appointment.hour = hour", {
      hour: schedulesData.hour,
    })
    .getOne();

  if (schedulesMedicExists || schedulesPatientExists) {
    throw new AppError("Schedule already exists", 409);
  }

  const createSchedules = schedulesRepository.create(validated);

  await schedulesRepository.save(createSchedules);

  await schedulesRepository.update(
    {
      id: createSchedules.id,
    },
    {
      user: patient,
      medic: medicId,
    }
  );

  return { message: "Schedule created" };
};

export default createSchedulesService;
