import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { UsersMedic } from "../../entities/usermedic.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users/user.interface";
import jwt from "jsonwebtoken";
import { Users } from "../../entities/user.entity";

const createSessionUserService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(Users);
  const userMedicRepository = AppDataSource.getRepository(UsersMedic);

  const user = await userRepository.findOneBy({
    email: email,
  });

  const userMedic = await userMedicRepository.findOneBy({
    email: email,
  });

  if (!user && !userMedic) {
    throw new AppError("Email or password invalid", 400);
  }

  let token = "";

  if (user && !userMedic) {
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password invalid", 403);
    }

    token = jwt.sign(
      {
        isAdm: user.isAdm,
        isActive: user.isActive,
        isMedic: false,
      },
      process.env.SECRET_KEY!,
      {
        subject: user.id,
        expiresIn: "24h",
      }
    );
  } else if (!user && userMedic) {
    const passwordMatch = await compare(password, userMedic.password);

    if (!passwordMatch) {
      throw new AppError("Email or password invalid", 403);
    }

    token = jwt.sign(
      {
        isAdm: false,
        isActive: userMedic.isActive,
        isMedic: true,
      },
      process.env.SECRET_KEY!,
      {
        subject: userMedic.id,
        expiresIn: "24h",
      }
    );
  }
  return token;
};

export default createSessionUserService;
