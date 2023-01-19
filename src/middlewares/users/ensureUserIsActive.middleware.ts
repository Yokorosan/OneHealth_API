import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import { Users } from "../../entities/user.entity";
import AppDataSource from "../../data-source";

const ensureUserIsActiveMiddleware = async (req:Request, res: Response, next: NextFunction) => {
    const userToDeleteOrEditId = req.params.id

    const userRepository = AppDataSource.getRepository(Users)

    const findUser = await userRepository.findOneBy({
        id: userToDeleteOrEditId
    })

    if(!findUser){
        throw new AppError("User not found or inaticve!", 404)
    }

    return next()
}

export default ensureUserIsActiveMiddleware