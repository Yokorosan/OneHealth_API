import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { Users } from "../../entities/user.entity";
import { UsersMedic } from "../../entities/usermedic.entity";
import {
  IScheduleRequest,
  IScheduleResponse,
} from "../../interfaces/schedules/schedules.interface";
import { schedulesResponseSchema } from "../../schemas/schedules.schema";

const createSchedulesService = async (
  schedulesData: IScheduleRequest
): Promise<IScheduleResponse> => {
  const schedulesRepository = AppDataSource.getRepository(ScheduledAppointment);

  const patientRepository = AppDataSource.getRepository(Users);
  const patient = await patientRepository.findOneBy({
    id: schedulesData.user,
  });

  const medicRepository = AppDataSource.getRepository(UsersMedic);
  const medic = await medicRepository.findOneBy({ id: schedulesData.medic });

  const newSchedule = {
    type: schedulesData.type,
    date: schedulesData.date,
    hour: schedulesData.hour,
    user: patient!,
    medic: medic!,
  };
  const createSchedules = schedulesRepository.create(newSchedule);
  await schedulesRepository.save(createSchedules);

  const validatedSchedule = await schedulesResponseSchema.validate(
    createSchedules,
    {
      abortEarly: false,
      stripUnknown: true,
    }
  );
  return validatedSchedule;
};

export default createSchedulesService;
