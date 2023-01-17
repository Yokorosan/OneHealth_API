import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { diagnosticUpdateSchema } from "../../schemas/diagnostics.schema";

const ensureDiagnosticDataUpdateIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateSerializer = await diagnosticUpdateSchema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false,
        })

        req.body = updateSerializer

        return next()

    } catch (error:any) {
        console.log(error)
        return res.status(400).json({ error: error.errors });
    }
}

export default ensureDiagnosticDataUpdateIsValidMiddleware