import { Router } from "express";
import {
  createMedicController,
  deleteMedicController,
  listMedicsController,
  updateMedicController,
} from "../controllers/medics.controller";
import { ensureAddressNoRepeatMiddleware } from "../middlewares/medics/ensureAddressNoRepeat.middleware";
import { ensureMedicNoRepeatMiddleware } from "../middlewares/medics/ensureMedicsNoRepeat.middleware";
import { ensureUserIsAdmOrIsYourOwnIdMiddlware } from "../middlewares/medics/ensureUserIsAdmOrIsYourOwnId.middleware";
import { ensureValidData } from "../middlewares/medics/ensureValidData.middleware";
import { verifySpecialityMiddleware } from "../middlewares/medics/verifySpeciality.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";
import { ensureUsersNoRepeatMiddleware } from "../middlewares/users/ensureUserNoRepeatMiddleware";
import { MedicsRequestSchema } from "../schemas/medics.schema";

const medicsRoutes = Router();

medicsRoutes.post(
  "",
  ensureValidData(MedicsRequestSchema),
  ensureMedicNoRepeatMiddleware,
  ensureUsersNoRepeatMiddleware,
  ensureAddressNoRepeatMiddleware,
  verifySpecialityMiddleware,
  createMedicController
);
medicsRoutes.get("", ensureAuthMiddleware, listMedicsController);
medicsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  updateMedicController
);
medicsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  deleteMedicController
);

export default medicsRoutes;
