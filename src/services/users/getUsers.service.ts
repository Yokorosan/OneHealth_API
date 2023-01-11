import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/user.interface";



export const getUsersService = async ():Promise<IUserResponse[]> => {
    const userRepo = AppDataSource.getRepository(Users);
    return await userRepo.find();
  };
  