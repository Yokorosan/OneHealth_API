import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import ensureTypeUserMiddleware from "../middlewares/sessions/ensureUserIsActive.middleware";

const sessionRoutes = Router();

sessionRoutes.post("", ensureTypeUserMiddleware, createSessionController);

export default sessionRoutes;
