import { Router } from "express";
import {
  createAddressController,
  updateAddressController,
} from "../controllers/address.controller";

const addressRoutes = Router();

addressRoutes.post("", createAddressController);
addressRoutes.patch("/:id", updateAddressController);

export default addressRoutes;
