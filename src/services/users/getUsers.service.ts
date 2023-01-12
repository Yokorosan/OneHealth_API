import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/user.interface";
import { GetUsersSchema } from "../../schemas/users.shemas";

export const getUsersService = async (): Promise<IUserResponse[]> => {
  const userRepo = AppDataSource.getRepository(Users);
  const userQueryBuilder = userRepo.createQueryBuilder("user");

  const getUsers = await userQueryBuilder
    .withDeleted()
    .getMany();

  const usersWithoutPassword = await GetUsersSchema.validate(
    getUsers!,
    { stripUnknown: true, abortEarly: false }
  );

  return usersWithoutPassword!;
};
