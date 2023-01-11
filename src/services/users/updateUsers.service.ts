import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/user.interface";

export const updateUserService = async (body: IUserRequest, userId: string) => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOneBy({ id: userId });
  const newUser = userRepo.create({ ...user, ...body });
  await userRepo.update(userId, body);
  return newUser;
};
