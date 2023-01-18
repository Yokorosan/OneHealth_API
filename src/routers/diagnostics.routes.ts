import { Router } from "express";
import {
  createDiagnosticController,
  deletedDiagnosticController,
  listAllUserDiagnosticsController,
  listAllMedicDiagnosticsController,
  updateDiagnosticController,
} from "../controllers/diagnostics.controller";
import ensureCantUpdateMedicFieldMiddleware from "../middlewares/diagnostics/ensureCantUpdateMedicField.middleware";
import ensureCantUpdateUserFieldMiddleware from "../middlewares/diagnostics/ensureCantUpdateUserField.middleware";
import ensureDiagnosticDataIsValidMiddleware from "../middlewares/diagnostics/ensureDiagnosticDataIsValid.middleware";
import ensureDiagnosticDataUpdateIsValidMiddleware from "../middlewares/diagnostics/ensureDiagnosticDataUpdateIsValid.middleware";
import ensureDiagnosticIsCreatedOnlyForMedicsMiddleware from "../middlewares/diagnostics/ensureDiagnosticIsCreatedOnlyForMedics.middleware";
import ensureMedicAndUserExistsmiddleware from "../middlewares/diagnostics/ensureMedicAndUserExists.middleware";
import ensureMedicAndUserUuidIsValidMiddleware from "../middlewares/diagnostics/ensureMedicAndUserUuidIsValid.middleware";
import ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware from "../middlewares/diagnostics/ensureOnlyOneMedicCanEditOrDeleteDiagnostic.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";
import ensureUuidIsValidMiddleware from "../middlewares/sessions/ensureUuidIsValid.middleware";
import ensureUserIsActiveMiddleware from "../middlewares/users/ensureUserIsActive.middleware";

const diagnosticsRoutes = Router();

diagnosticsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureMedicAndUserUuidIsValidMiddleware,
  ensureDiagnosticDataIsValidMiddleware,
  ensureDiagnosticIsCreatedOnlyForMedicsMiddleware,
  ensureMedicAndUserExistsmiddleware,
  createDiagnosticController
);

diagnosticsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware,
  ensureUuidIsValidMiddleware,
  deletedDiagnosticController
);

diagnosticsRoutes.get(
  "/medics",
  ensureAuthMiddleware,
  ensureDiagnosticIsCreatedOnlyForMedicsMiddleware,
  listAllMedicDiagnosticsController
);

diagnosticsRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureDiagnosticIsCreatedOnlyForMedicsMiddleware,
  ensureUuidIsValidMiddleware,
  ensureUserIsActiveMiddleware,
  listAllUserDiagnosticsController
);

diagnosticsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware,
  ensureCantUpdateUserFieldMiddleware,
  ensureCantUpdateMedicFieldMiddleware,
  ensureDiagnosticDataUpdateIsValidMiddleware,
  ensureUuidIsValidMiddleware,
  updateDiagnosticController
);

export default diagnosticsRoutes;
