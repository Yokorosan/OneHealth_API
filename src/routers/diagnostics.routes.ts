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
import ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware from "../middlewares/diagnostics/ensureOnlyOneMedicCanEditOrDeleteDiagnostic.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";

const diagnosticsRoutes = Router();

diagnosticsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDiagnosticDataIsValidMiddleware,
  ensureDiagnosticIsCreatedOnlyForMedicsMiddleware,
  createDiagnosticController
);
diagnosticsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware,
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
  listAllMedicDiagnosticsController,
  ensureDiagnosticIsCreatedOnlyForMedicsMiddleware,
  listAllUserDiagnosticsController
);
diagnosticsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware,
  ensureCantUpdateUserFieldMiddleware,
  ensureCantUpdateMedicFieldMiddleware,
  ensureDiagnosticDataUpdateIsValidMiddleware,
  updateDiagnosticController
);
diagnosticsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware,
  ensureCantUpdateUserFieldMiddleware,
  ensureCantUpdateMedicFieldMiddleware,
  ensureDiagnosticDataUpdateIsValidMiddleware,
  updateDiagnosticController
);

export default diagnosticsRoutes;
