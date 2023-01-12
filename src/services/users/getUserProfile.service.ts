import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/user.interface";

export const getUserProfileService = async (userId:string): Promise<IUserResponse> => {
    const userRepo = AppDataSource.getRepository(Users);
   const getUser = await userRepo.findOneBy({ id: userId}) ;
    return getUser!
  };
  