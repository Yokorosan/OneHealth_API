import { Router } from "express";
import {
  createDoctorController,
  listDoctorsController,
} from "../controllers/doctors.controller";
import { ensureDoctorNoRepeat } from "../middlewares/doctors/ensureDoctorNoRepeat.middleware";

const doctorsRoutes = Router();

doctorsRoutes.post("", ensureDoctorNoRepeat, createDoctorController);
doctorsRoutes.get("", listDoctorsController);

export default doctorsRoutes;
