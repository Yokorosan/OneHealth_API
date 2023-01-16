import { Router } from "express";
import { createDiagnosticController } from "../controllers/diagnostics.controller";

const diagnosticsRoutes = Router()

diagnosticsRoutes.post("", createDiagnosticController)

export default diagnosticsRoutes