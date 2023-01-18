import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IGetUserProfile } from "../../interfaces/medics/medics.interface";


export const listUserForEmailService = async (emailUser: string) => {


    const userRepository = AppDataSource.getRepository(Users)

    const findUser = await userRepository.findOneBy({
        email: emailUser
    })

    return findUser

}

