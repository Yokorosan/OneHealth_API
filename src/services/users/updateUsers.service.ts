import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import {
  IUserRequest,
  IUserResponse,
} from "../../interfaces/users/user.interface";
import { UsersWhitoutPassSchemaResponse } from "../../schemas/users.shemas";

export const updateUserService = async (
  body: IUserRequest,
  userId: string
): Promise<IUserResponse> => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOneBy({ id: userId });

  const newUser = userRepo.create({ ...user, ...body });
  await userRepo.update(userId, body);
  return await UsersWhitoutPassSchemaResponse.validate(newUser, {
    stripUnknown: true,
    abortEarly: false,
  });
};
