import { Router } from "express";
import { createSchedulesController } from "../controllers/schedules.controller";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", ensureAuthMiddleware, createSchedulesController);

export default schedulesRoutes;
