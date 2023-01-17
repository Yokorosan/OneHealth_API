import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { IScheduleListMedicResponse } from "../../interfaces/schedules/schedules.interface";
import { scheduleListMedicResponseSchema } from "../../schemas/schedules.schema";

const listAllMedicSchedulesService = async (
  medicId: string
): Promise<IScheduleListMedicResponse> => {
  const medicRepository = AppDataSource.getRepository(UsersMedic);

  const medicSchedules = await medicRepository
    .createQueryBuilder("medics")
    .innerJoinAndSelect("medics.appointment", "appointment")
    .innerJoinAndSelect("appointment.user", "user")
    .where("appointment.medicId = :id", { id: medicId })
    .getOne();

  if (!medicSchedules) {
    throw new AppError("No Schedules Found", 404);
  }

  const validadedMedicSchedules =
    await scheduleListMedicResponseSchema.validate(medicSchedules, {
      stripUnknown: true,
      abortEarly: false,
    });

 
  return validadedMedicSchedules;
};

export { listAllMedicSchedulesService };
