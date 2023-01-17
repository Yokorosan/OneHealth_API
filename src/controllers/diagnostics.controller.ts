import { Request, Response } from "express";
import createDiagnosticService from "../services/diagnostics/createDiagnostic.service";
import deleteDiagnosticService from "../services/diagnostics/deleteDiagnostic.service";
import { listAllMedicDiagnosticsService } from "../services/diagnostics/listAllMedicDiagnostics.service";
import { listAllUserDiagnosticsService } from "../services/diagnostics/listAllUserDiagnostics.service";

const createDiagnosticController = async (req: Request, res: Response) => {
  const newDiagnosticData = req.body;

  const newDiagnosticCreated = await createDiagnosticService(newDiagnosticData);

  return res.status(201).json(newDiagnosticCreated);
};

const deletedDiagnosticController = async (req: Request, res: Response) => {
  const diagnosticId = req.params.id;

  const deletedDiagnostic = await deleteDiagnosticService(diagnosticId);

  return res.status(204).json({});
};

const listAllUserDiagnosticsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.id;

  const allUserDiagnostics = await listAllUserDiagnosticsService(userId);

  return res.status(200).json(allUserDiagnostics);
};

const listAllMedicDiagnosticsController = async (
  req: Request,
  res: Response
) => {
  const allMedicDiagnostics = await listAllMedicDiagnosticsService(req.user.id);

  return res.status(200).json(allMedicDiagnostics);
};

export {
  createDiagnosticController,
  deletedDiagnosticController,
  listAllUserDiagnosticsController,
  listAllMedicDiagnosticsController,
};
