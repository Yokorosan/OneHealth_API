import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureLoginDataMiddleware = (req:Request, res: Response, next: NextFunction) => {
    const userLoginData = req.body

    if(!userLoginData.email || !userLoginData.password){
        throw new AppError("Missing password or email field!", 400)
    }

    return next()
}

export default ensureLoginDataMiddleware