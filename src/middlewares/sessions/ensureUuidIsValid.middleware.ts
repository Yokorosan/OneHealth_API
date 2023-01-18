import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const ensureUuidIsValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.id

    if(uuid.length !== 36){
        throw new AppError ("Invalid uuid!", 400)
    }

    return next()
}

export default ensureUuidIsValidMiddleware