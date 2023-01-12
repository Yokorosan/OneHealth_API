import { Router } from "express";
import {
  createAddressController,
  updateAddressController,
} from "../controllers/address.controller";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";

const addressRoutes = Router();

addressRoutes.post("", ensureAuthMiddleware, createAddressController);
addressRoutes.patch("/:id", ensureAuthMiddleware, updateAddressController);

export default addressRoutes;
