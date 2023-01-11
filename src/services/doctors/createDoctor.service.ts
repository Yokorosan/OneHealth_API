import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import {
  IDoctor,
  IDoctorRequest,
} from "../../interfaces/doctors/doctors.interface";

export const createDoctorService = async (data: any) => {
  const doctorRepository = AppDataSource.getRepository(UsersMedic);

  const createdDoctor = doctorRepository.create(data);

  await doctorRepository.save(createdDoctor);

  return createdDoctor;
};
