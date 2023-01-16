import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

const ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware = async (req:Request, res:Response, next: NextFunction) => {
    const userRequestId = req.user.isMedic

    if(userRequestId === false){
        throw new AppError("Only medics can create an dianostic!", 401)
    }

    return next()
}

export default ensureDiagnosticIsManipulatedOnlyForMedicsMiddleware