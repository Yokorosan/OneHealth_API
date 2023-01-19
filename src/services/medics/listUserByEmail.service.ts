import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { IGetUserProfile } from "../../interfaces/medics/medics.interface";
import { listUserByEmailReturned } from "../../schemas/medics.schema";


export const listUserByEmailService = async (emailUser: string) => {


    const userRepository = AppDataSource.getRepository(Users)

    const findUser = await userRepository.findOneBy({
        email: emailUser
    })

    const returnedUserValidate = listUserByEmailReturned.validate(findUser, {
        stripUnknown: true,
        abortEarly: false
    })

    return returnedUserValidate

}

