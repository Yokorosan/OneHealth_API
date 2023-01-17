import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { diagnosticsByUserResponse } from "../../schemas/diagnostics.schema";

export const listAllMedicDiagnosticsService = async (medicId: string) => {
  const medicsRepository = AppDataSource.getRepository(UsersMedic);

  const medicDiagnostics = await medicsRepository
    .createQueryBuilder("diagnostics")
    .innerJoinAndSelect("diagnostics.diagnostic", "diagnostic")
    .where("diagnostics.id = :id", { id: medicId })
    .getOne();

  if (!medicDiagnostics) {
    throw new AppError("Medic without diagnostics!", 404);
  }

  const medicDiagnosticsResponse = await diagnosticsByUserResponse.validate(
    medicDiagnostics,
    {
      stripUnknown: true,
      abortEarly: false,
    }
  );

  return medicDiagnosticsResponse;
};
