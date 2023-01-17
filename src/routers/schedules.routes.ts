import { Router } from "express";
import {
  createSchedulesController,
  deleteScheduleController,
  listAllMedicSchedulesController,
  updateScheduleController,
} from "../controllers/schedules.controller";
import verifyDateHourIsValidMiddleware from "../middlewares/schedules/verifyDateHourIsValid.middleware";
import { verifyScheduleOwnershipOrAdminMiddleware } from "../middlewares/schedules/verifyScheduleOwnershipOrAdmin.middleware";
import { verifyScheduleExistsMiddleware } from "../middlewares/schedules/verifyScheduleExists.middleware";
import { verifyScheduleMedicMiddleware } from "../middlewares/schedules/verifyScheduleMedic.middleware";
import { verifyScheduleUserMiddleware } from "../middlewares/schedules/verifyScheduleUser.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";
import { verifyIfDateHourAlreadyExistMiddleware } from "../middlewares/schedules/verifyIfDateHourAlreadyExist.middleware";
import { verifyUpdateScheduleDataMiddleware } from "../middlewares/schedules/verifyUpdateScheduleData.middleware";
import {
  schedulesRequestSchema,
  UpdateScheduleSchema,
} from "../schemas/schedules.schema";
import { verifyScheduleCreateDataMiddleware } from "../middlewares/schedules/verifyScheduleCreateData.middleware";
import ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware from "../middlewares/diagnostics/ensureDiagnosticIsCreateOnlyForMedics.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  ensureAuthMiddleware,
  verifyScheduleCreateDataMiddleware(schedulesRequestSchema),
  verifyDateHourIsValidMiddleware,
  verifyScheduleUserMiddleware,
  verifyScheduleMedicMiddleware,
  createSchedulesController
);

schedulesRoutes.get(
  "/medics",
  ensureAuthMiddleware,
  ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware,
  listAllMedicSchedulesController
);

schedulesRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  verifyScheduleExistsMiddleware,
  verifyScheduleOwnershipOrAdminMiddleware,
  deleteScheduleController
);

schedulesRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  verifyUpdateScheduleDataMiddleware(UpdateScheduleSchema),
  verifyDateHourIsValidMiddleware,
  verifyScheduleOwnershipOrAdminMiddleware,
  verifyIfDateHourAlreadyExistMiddleware,
  verifyScheduleExistsMiddleware,
  updateScheduleController
);

export default schedulesRoutes;
