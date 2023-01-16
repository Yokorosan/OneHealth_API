import { Router } from "express";
import {
  createSchedulesController,
  deleteScheduleController,
  getScheduleController,
  updateScheduleController,
} from "../controllers/schedules.controller";
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
schedulesRoutes.delete("/:id", ensureAuthMiddleware, deleteScheduleController);

schedulesRoutes.patch("/:id", ensureAuthMiddleware, verifyDateHourIsValidMiddleware, verifyScheduleMedicMiddleware, verifyScheduleUserMiddleware, updateScheduleController);
// schedulesRoutes.get("", ensureAuthMiddleware, getScheduleController);

export default schedulesRoutes;
