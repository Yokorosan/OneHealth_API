import { Request, Response } from "express";
import createDiagnosticService from "../services/diagnostics/createDiagnostic.service";

const createDiagnosticController = async (req:Request, res:Response) => {
    const newDiagnosticData = req.body

    const newDiagnosticCreated = await createDiagnosticService(newDiagnosticData)

    return res.status(201).json({newDiagnosticCreated})
}

export {createDiagnosticController}