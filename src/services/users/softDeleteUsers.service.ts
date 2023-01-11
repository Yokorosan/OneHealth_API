import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";

export const softDeleteUserService = async (userId: string) => {
  const userRepo = AppDataSource.getRepository(Users);
  const findUser = await userRepo.findOneBy({ id: userId });
  findUser!.isActive = false;
  await userRepo.update(userId, findUser!);
  await userRepo.softRemove(findUser!);
};
