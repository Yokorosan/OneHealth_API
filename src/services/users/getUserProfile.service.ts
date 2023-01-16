import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/user.interface";

export const getUserProfileService = async (userId: string): Promise<any> => {
  const userRepo = AppDataSource.getRepository(Users);
  const getUserDataQueryBuilder = userRepo.createQueryBuilder("user");

  const userSchedulesVerification = await getUserDataQueryBuilder
    .leftJoinAndSelect("user.diagnostic", "diagnostic")
    .leftJoinAndSelect("user.appointment", "userAppointment")
    .where("user.id = :id", { id: userId })
    .getOne();

  return userSchedulesVerification!;
};
