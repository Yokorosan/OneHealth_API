import AppDataSource from "../../data-source";
import { NextFunction, Request, Response } from "express";
import { Diagnostic } from "../../entities/diagnostic.entity";
import { AppError } from "../../errors/AppError";

const ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userMedicThatMakesTheDiagnosticId = req.user.id
    const diagnosticId = req.params.id

    const diagnosticRepository = AppDataSource.getRepository(Diagnostic)

    const findTheDiagnostic = await diagnosticRepository.createQueryBuilder("diagnosticMedic")
    .where("diagnosticMedic.id = :id",{id:diagnosticId})
    .innerJoinAndSelect("diagnosticMedic.medic","medic")
    .where("medic.id = diagnosticMedic.medicId ")
    .getOne()

    if(findTheDiagnostic?.medic.id !== userMedicThatMakesTheDiagnosticId){
        throw new AppError("You can only update you own diagnostics!", 403)
    }

    return next()
}

export default ensureOnlyOneMedicCanEditOrDeleteDiagnosticMiddleware