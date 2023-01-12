import { Router } from "express";
import {
  createMedicController,
  deleteMedicController,
  listMedicsController,
  updateMedicController,
} from "../controllers/medics.controller";
import { ensureAddressNoRepeatMiddleware } from "../middlewares/medics/ensureAddressNoRepeat.middleware";
import { ensureMedicNoRepeatMiddleware } from "../middlewares/medics/ensureMedicsNoRepeat.middleware";
import { ensureValidData } from "../middlewares/medics/ensureValidData.middleware";
import { verifySpecialityMiddleware } from "../middlewares/medics/verifySpeciality.middleware";
import { MedicsRequestSchema } from "../schemas/medics.schema";

const medicsRoutes = Router();

medicsRoutes.post(
  "",
  ensureValidData(MedicsRequestSchema),
  ensureMedicNoRepeatMiddleware,
  ensureAddressNoRepeatMiddleware,
  verifySpecialityMiddleware,
  createMedicController
);
medicsRoutes.get("", listMedicsController);
medicsRoutes.patch("/:id", updateMedicController);
medicsRoutes.delete("/:id", deleteMedicController);

export default medicsRoutes;
