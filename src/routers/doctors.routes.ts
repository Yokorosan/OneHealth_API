import { Router } from "express";
import {
  createDoctorController,
  listDoctorsController,
} from "../controllers/doctors.controller";

const doctorsRoutes = Router();

doctorsRoutes.post("", createDoctorController);
doctorsRoutes.get("", listDoctorsController);

export default doctorsRoutes;
