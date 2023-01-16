import { Router } from "express";
import {
  createDiagnosticController,
  deletedDiagnosticController,
  listAllMedicDiagnosticsController,
} from "../controllers/diagnostics.controller";
import ensureDiagnosticDataIsValidMiddleware from "../middlewares/diagnostics/ensureDiagnosticDataIsValid.middleware";
import ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware from "../middlewares/diagnostics/ensureDiagnosticIsCreateOnlyForMedics.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";

const diagnosticsRoutes = Router();

diagnosticsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDiagnosticDataIsValidMiddleware,
  ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware,
  createDiagnosticController
);
diagnosticsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware,
  deletedDiagnosticController
);
diagnosticsRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware,
  listAllMedicDiagnosticsController
);

export default diagnosticsRoutes;
