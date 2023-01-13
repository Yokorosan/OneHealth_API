import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/users/user.interface";
import { UsersWhitoutPassSchemaResponse } from "../../schemas/users.shemas";

export const createUserService = async (body: IUserRequest): Promise<IUserResponse> => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = userRepo.create(body);
  await userRepo.save(user)
  return  await UsersWhitoutPassSchemaResponse.validate(user,{stripUnknown: true, abortEarly:false}) ;
};
