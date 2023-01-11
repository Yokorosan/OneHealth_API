import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { IDoctor } from "../../interfaces/doctors/doctors.interface";

export const listDoctorsService = async () => {
  const doctorRepository = AppDataSource.getRepository(UsersMedic);

  const doctors = await doctorRepository.find();

  return doctors;
};
