import { Request, Response } from "express";
import { createDoctorService } from "../services/doctors/createDoctor.service";
import { listDoctorsService } from "../services/doctors/listDoctors.service";

const createDoctorController = async (req: Request, res: Response) => {
  const newDoctor = await createDoctorService(req.body);

  return res.status(201).json(newDoctor);
};

const listDoctorsController = async (req: Request, res: Response) => {
  const doctors = await listDoctorsService();

  return res.status(200).json(doctors);
};

export { createDoctorController, listDoctorsController };
