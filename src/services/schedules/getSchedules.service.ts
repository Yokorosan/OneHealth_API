import { ScheduledAppointment } from "../../entities/appoitments.entity";
import AppDataSource from "../../data-source";
export const  getScheduleService = async () => {
    const userRepo = AppDataSource.getRepository(ScheduledAppointment);

    const getUsers = await userRepo.find({ withDeleted: true });
  return getUsers
}