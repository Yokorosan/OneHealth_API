import { Router } from "express";
import { updateAddressMedicController } from "../controllers/addressMedic.controller";

const addressMedicRoutes = Router();

addressMedicRoutes.patch("/:id", updateAddressMedicController);

export default addressMedicRoutes;
