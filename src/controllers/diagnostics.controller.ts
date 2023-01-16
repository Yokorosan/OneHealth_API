import { Request, Response } from "express";
import createDiagnosticService from "../services/diagnostics/createDiagnostic.service";
import deleteDiagnosticService from "../services/diagnostics/deleteDiagnostic.service";
import listAllMedicDiagnosticService from "../services/diagnostics/listAllUserDiagnostics.service";

const createDiagnosticController = async (req:Request, res:Response) => {
    const newDiagnosticData = req.body

    const newDiagnosticCreated = await createDiagnosticService(newDiagnosticData)

    return res.status(201).json(newDiagnosticCreated)
}

const deletedDiagnosticController = async (req: Request, res: Response) => {
    const diagnosticId = req.params.id 

    const deletedDiagnostic = await deleteDiagnosticService(diagnosticId)

    return res.status(204).json({})
}

const listAllMedicDiagnosticsController = async (req: Request, res: Response) => {
    const userId = req.params.id

    const allUserDiagnostics = await listAllMedicDiagnosticService(userId)

    return res.status(200).json(allUserDiagnostics)
}

export {createDiagnosticController, deletedDiagnosticController,listAllMedicDiagnosticsController}