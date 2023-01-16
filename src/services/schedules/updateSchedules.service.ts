import { ScheduledAppointment } from "../../entities/appoitments.entity";
import AppDataSource from "../../data-source";

export const updateScheduleService = async (body: any, scheduleId: string) => {
  const schedulesRepo = AppDataSource.getRepository(ScheduledAppointment);
  const schedule = await schedulesRepo.findOneBy({
    id: scheduleId,
  });
  await schedulesRepo.update(scheduleId, body);
  const newSchedule = schedulesRepo.create({ ...schedule, ...body });
  return newSchedule;
};
