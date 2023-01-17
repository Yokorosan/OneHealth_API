import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { schedulesUserResponseSchema } from "../../schemas/users.schema";

export const getUserProfileService = async (userId: string): Promise<any> => {
  const userRepo = AppDataSource.getRepository(Users);
  const getUserDataQueryBuilder = userRepo.createQueryBuilder("user");

  const userSchedulesVerification = await getUserDataQueryBuilder
    .leftJoinAndSelect("user.diagnostic", "diagnostic")
    .leftJoinAndSelect("user.appointment", "userAppointment")
    .orderBy()
    .where("user.id = :id", { id: userId })
    .getOne();

  const userReturnedData = await schedulesUserResponseSchema.validate(
    userSchedulesVerification,
    {
      stripUnknown: true,
      abortEarly: false,
    }
  );

  return userReturnedData!;
};
