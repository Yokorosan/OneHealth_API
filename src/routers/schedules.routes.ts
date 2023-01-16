import { Router } from "express";
import {
  createSchedulesController,
  deleteScheduleController,
} from "../controllers/schedules.controller";
import verifyDateHourIsValidMiddleware from "../middlewares/schedules/verifyDateHourIsValid.middleware";
import { verifyScheduleOwnershipOrAdminMiddleware } from "../middlewares/schedules/verifyScheduleOwnershipOrAdmin.middleware";
import { verifyScheduleExistsMiddleware } from "../middlewares/schedules/verifyScheduleExists.middleware";
import { verifyScheduleMedicMiddleware } from "../middlewares/schedules/verifyScheduleMedic.middleware";
import { verifyScheduleUserMiddleware } from "../middlewares/schedules/verifyScheduleUser.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  ensureAuthMiddleware,
  verifyDateHourIsValidMiddleware,
  verifyScheduleUserMiddleware,
  verifyScheduleMedicMiddleware,
  createSchedulesController
);
schedulesRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  verifyScheduleExistsMiddleware,
  verifyScheduleOwnershipOrAdminMiddleware,
  deleteScheduleController
);

export default schedulesRoutes;
