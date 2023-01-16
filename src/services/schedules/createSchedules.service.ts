import AppDataSource from "../../data-source";
import { ScheduledAppointment } from "../../entities/appoitments.entity";
import { Users } from "../../entities/user.entity";
import { UsersMedic } from "../../entities/usermedic.entity";
import {
  IScheduleRequest,
  IScheduleResponse,
} from "../../interfaces/schedules/schedules.interface";
import {
  schedulesRequestSchema,
  schedulesResponseSchema,
} from "../../schemas/schedules.schema";

const createSchedulesService = async (
  schedulesData: IScheduleRequest
): Promise<IScheduleResponse> => {
  const validated = await schedulesRequestSchema.validate(schedulesData, {
    stripUnknown: true,
    abortEarly: false,
  });

  console.log(schedulesData);

  const schedulesRepository = AppDataSource.getRepository(ScheduledAppointment);

  const patientRepository = AppDataSource.getRepository(Users);
  const patient = await patientRepository.findOneBy({
    id: validated.user,
  });

  const medicRepository = AppDataSource.getRepository(UsersMedic);
  const medic = await medicRepository.findOneBy({ id: validated.medic });

  const newSchedule = {
    type: validated.type,
    date: validated.date,
    hour: validated.hour,
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
