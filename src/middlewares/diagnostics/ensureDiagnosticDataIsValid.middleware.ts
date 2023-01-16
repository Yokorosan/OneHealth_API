import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { diagnosticRequestSchema } from "../../schemas/diagnostics.schema";

const ensureDiagnosticDataIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newDiagnostic = req.body

        const diagnosticSerializer = await diagnosticRequestSchema.validate(newDiagnostic, {
            stripUnknown: true,
            abortEarly: false,
        })

        return next()
        
    } catch (error:any) {
        console.log(error)
        throw new AppError("Invalid diagnostic data!", 400)
    }

}

export default ensureDiagnosticDataIsValidMiddleware