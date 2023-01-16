import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/user.interface";
import { GetUsersSchema } from "../../schemas/users.schema";

export const getUsersService = async (): Promise<IUserResponse[]> => {
  const userRepo = AppDataSource.getRepository(Users);

  const getUsers = await userRepo.find({ withDeleted: true });

  const usersWithoutPassword = await GetUsersSchema.validate(getUsers, {
    abortEarly: false,
  });

  return usersWithoutPassword!;
};
