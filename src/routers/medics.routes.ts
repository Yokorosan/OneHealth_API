import { Router } from "express";
import {
  createMedicController,
  deleteMedicController,
  listMedicsController,
  listUserForEmailController,
  retrieveMedicDataController,
  updateMedicController,
} from "../controllers/medics.controller";
import { ensureAddressNoRepeatMiddleware } from "../middlewares/medics/ensureAddressNoRepeat.middleware";
import ensureCantUpdateIsActiveFieldMiddleware from "../middlewares/sessions/ensureCantUpdateIsActiveField.middleware";
import { ensureMedicNoRepeatMiddleware } from "../middlewares/medics/ensureMedicsNoRepeat.middleware";
import ensureUserMedicExistMiddleware from "../middlewares/medics/ensureUserMedicExist.middleware";
import { ensureValidData } from "../middlewares/medics/ensureValidData.middleware";
import { verifySpecialityMiddleware } from "../middlewares/medics/verifySpeciality.middleware";
import ensureUserIsAdmOrIsYourOwnIdMiddlware from "../middlewares/sessions/ensureUserIsAdmOrIsYourOwnId.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";
import { ensureUsersNoRepeatMiddleware } from "../middlewares/users/ensureUserNoRepeatMiddleware";

import { MedicsRequestSchema } from "../schemas/medics.schema";
import ensureCantUpdateIdFieldMiddleware from "../middlewares/sessions/ensureCantUpdateIdField.middleware";
import ensureUserMedicIsActiveMiddleware from "../middlewares/medics/ensureUserMedicIsActive.middleware";

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
medicsRoutes.get("/profile", ensureAuthMiddleware, retrieveMedicDataController);
medicsRoutes.get("/user/:id", ensureAuthMiddleware, listUserForEmailController);
medicsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  ensureUserMedicExistMiddleware,
  ensureCantUpdateIdFieldMiddleware,
  ensureCantUpdateIsActiveFieldMiddleware,
  updateMedicController
);
medicsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  ensureUserMedicIsActiveMiddleware,
  ensureUserMedicExistMiddleware,
  deleteMedicController
);

export default medicsRoutes;
