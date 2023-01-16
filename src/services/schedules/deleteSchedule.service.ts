import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";

export const deleteScheduleService = async (scheduleId: string) => {
  const schedulesRepository = AppDataSource.getRepository(ScheduledAppointment);

  const schedule = await schedulesRepository.findOneBy({
    id: scheduleId,
  });

  await schedulesRepository.remove(schedule!);
};
