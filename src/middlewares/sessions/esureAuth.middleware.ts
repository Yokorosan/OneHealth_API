import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid Token!", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(`${error.message}`, 401);
    }

    req.user = {
      id: decoded?.sub,
      isAdm: decoded?.isAdm,
      isActive: decoded?.isActive,
      isMedic: decoded?.isMedic,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
