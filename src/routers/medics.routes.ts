import { Router } from "express";
import {
  createMedicController,
  listMedicsController,
} from "../controllers/medics.controller";
import { ensureMedicNoRepeatMiddleware } from "../middlewares/medics/ensureMedicsNoRepeat.middleware";

const MedicsRoutes = Router();

MedicsRoutes.post("", ensureMedicNoRepeatMiddleware, createMedicController);
MedicsRoutes.get("", listMedicsController);

export default MedicsRoutes;
