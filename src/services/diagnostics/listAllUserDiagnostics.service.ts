import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { allUsersDiagnosticSchema } from "../../schemas/diagnostics.schema";

export const listAllMedicDiagnosticService = async (
  userId: string
): Promise<any> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const userDiagnostics = await usersRepository
    .createQueryBuilder("diagnostics")
    .innerJoinAndSelect("diagnostics.diagnostic", "diagnostic")
    .where("diagnostics.id = :id", { id: userId })
    .getMany();

  if (!userDiagnostics) {
    throw new AppError("Not found diagnostics for this user!", 404);
  }

  const correctListDiagnosticReturn = await allUsersDiagnosticSchema.validate(
    userDiagnostics,
    {
      stripUnknown: true,
      abortEarly: false,
    }
  );

  return userDiagnostics;
};
