import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";

export const listAllDiagnosticsService = async (medicId: string) => {
  const medicsRepository = AppDataSource.getRepository(UsersMedic);

  const medicDiagnostics = await medicsRepository
    .createQueryBuilder("diagnostics")
    .innerJoinAndSelect("diagnostics.diagnostic", "diagnostic")
    .where("diagnostics.id = :id", { id: medicId })
    .getMany();

  if (!medicDiagnostics) {
    throw new AppError("Medic without diagnostics!", 404);
  }

  return medicDiagnostics;
};
