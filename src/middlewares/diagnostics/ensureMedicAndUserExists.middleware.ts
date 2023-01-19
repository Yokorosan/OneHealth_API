import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import { UsersMedic } from "../../entities/usermedic.entity";
import { Users } from "../../entities/user.entity";
import AppDataSource from "../../data-source";

const ensureMedicAndUserExistsmiddleware = async (req:Request, res: Response, next: NextFunction) => {
    const newDiagnosticUserId  = req.body.user
    const newDiagnosticMedicId = req.body.medic

    const medicRepository = AppDataSource.getRepository(UsersMedic)
    const userRepository = AppDataSource.getRepository(Users)

    const findMedic = await medicRepository.findOneBy({
        id:newDiagnosticMedicId
    })

    const findUser = await userRepository.findOneBy({
        id:newDiagnosticUserId
    })

    if(!findUser || !findMedic){
        throw new AppError("User or medic not found!", 404)
    }

    return next()
}

export default ensureMedicAndUserExistsmiddleware