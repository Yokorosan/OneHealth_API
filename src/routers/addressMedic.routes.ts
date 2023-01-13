import { Router } from "express";
import { updateAddressMedicController } from "../controllers/addressMedic.controller";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";

const addressMedicRoutes = Router();

addressMedicRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  updateAddressMedicController
);

export default addressMedicRoutes;
