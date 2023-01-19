import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import {
  IUserRequest,
  IUserResponse,
} from "../../interfaces/users/user.interface";
import { UsersWhitoutPassSchemaResponse } from "../../schemas/users.schema";

export const updateUserService = async (
  body: IUserRequest,
  userId: string
): Promise<IUserResponse> => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOneBy({ id: userId });

  if (body.address && !user?.address) {
    throw new AppError(
      "User does not have address, must create one before updating",
      404
    );
  }

  const newUser = userRepo.create({ ...user, ...body });
  await userRepo.update(userId, body);
  return await UsersWhitoutPassSchemaResponse.validate(newUser, {
    stripUnknown: true,
    abortEarly: false,
  });
};
