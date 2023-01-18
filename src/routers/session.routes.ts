import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import ensureLoginDataMiddleware from "../middlewares/sessions/ensureLoginData.middleware";
import ensureTypeUserMiddleware from "../middlewares/sessions/ensureUserIsActive.middleware";

const sessionRoutes = Router();

sessionRoutes.post("", ensureLoginDataMiddleware, ensureTypeUserMiddleware, createSessionController);

export default sessionRoutes;
