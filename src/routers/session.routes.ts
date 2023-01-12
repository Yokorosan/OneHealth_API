import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import ensureTypeUserMiddleware from "../middlewares/users/ensureTypeUser.middleware";

const sessionRoutes = Router();

sessionRoutes.post("", ensureTypeUserMiddleware, createSessionController);

export { sessionRoutes };
