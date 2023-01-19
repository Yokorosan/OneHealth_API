import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { diagnosticRequestSchema } from "../../schemas/diagnostics.schema";

const ensureDiagnosticDataIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const diagnosticSerializer = await diagnosticRequestSchema.validate(
      req.body,
      {
        stripUnknown: true,
        abortEarly: false,
      }
    );

    req.body = diagnosticSerializer;

    return next();
  } catch (error: any) {
    return res.status(400).json({ error: error.errors });
  }
};

export default ensureDiagnosticDataIsValidMiddleware;
