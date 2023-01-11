import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/user.interface";

  export  const  createUserService = async (body:IUserRequest) => {
    const userRepo = AppDataSource.getRepository(Users);
    const user = userRepo.create(body);
    return await userRepo.save(user);

    };
    