import { Router } from "express";
import { createSchedulesController } from "../controllers/schedules.controller";
import verifyDateHourIsValidMiddleware from "../middlewares/schedules/verifyDateHourIsValid.middleware";
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

export default schedulesRoutes;
