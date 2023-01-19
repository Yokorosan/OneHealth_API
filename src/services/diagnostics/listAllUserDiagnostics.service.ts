import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { diagnosticsByUserResponse } from "../../schemas/diagnostics.schema";

export const listAllUserDiagnosticsService = async (
  userId: string
): Promise<any> => {
  const usersRepository = AppDataSource.getRepository(Users);

  const userDiagnostics = await usersRepository
    .createQueryBuilder("diagnostics")
    .innerJoinAndSelect("diagnostics.diagnostic", "diagnostic")
    .where("diagnostics.id = :id", { id: userId })
    .getOne();

  if (!userDiagnostics) {
    throw new AppError("Not found diagnostics for this user!", 404);
  }

  const userDiagnosticsResponse = await diagnosticsByUserResponse.validate(
    userDiagnostics,
    {
      stripUnknown: true,
      abortEarly: false,
    }
  );

  return userDiagnosticsResponse;
};
