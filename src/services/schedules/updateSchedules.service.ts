import { ScheduledAppointment } from "../../entities/appoitments.entity";
import AppDataSource from "../../data-source";
import { IScheduleUpdateRequest } from "../../interfaces/schedules/schedules.interface";
import { schedulesResponseSchema } from "../../schemas/schedules.schema";

export const updateScheduleService = async (
  body: IScheduleUpdateRequest,
  scheduleId: string
) => {
  const schedulesRepo = AppDataSource.getRepository(ScheduledAppointment);
  const schedule = await schedulesRepo.findOneBy({
    id: scheduleId,
  });
  await schedulesRepo.update(scheduleId, body);

  const newSchedule = await schedulesRepo
    .createQueryBuilder("schedule")
    .where("schedule.id = :id", { id: scheduleId })
    .innerJoinAndSelect("schedule.medic", "medic")
    .innerJoinAndSelect("schedule.user", "user")
    .getOne();

  const validatedNewSchedule = schedulesResponseSchema.validate(newSchedule, {
    stripUnknown: true,
    abortEarly: false,
  });
  return validatedNewSchedule;
};
