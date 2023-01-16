import { IDiagnosticRequest } from "../../interfaces/diagnostics/diagnostics.interface"
import { Diagnostic } from "../../entities/diagnostic.entity"
import { Users } from "../../entities/user.entity"
import { UsersMedic } from "../../entities/usermedic.entity"
import AppDataSource from "../../data-source"

const createDiagnosticService = async (newDiagnosticData:IDiagnosticRequest): Promise<Diagnostic> => {

       // const diagnosticSerializer = await diagnosticRequestSchema.validate(newDiagnosticInstance, {
    //     stripUnknown: true,
    //     abortEarly: false,
    // })

    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({
        id:newDiagnosticData.user
    })

    const medicRepository = AppDataSource.getRepository(UsersMedic)

    const medic = await medicRepository.findOneBy({
        id:newDiagnosticData.medic
    })

    const newDiagnostic = {
        name: newDiagnosticData.name,
        date: newDiagnosticData.date,
        description: newDiagnosticData.description,
        user: user!,
        medic: medic!
    }
     const diagnosticRepository = AppDataSource.getRepository(Diagnostic)

     const createDiagnostic = diagnosticRepository.create(newDiagnostic)

     await diagnosticRepository.save(createDiagnostic)

     return createDiagnostic
}

export default createDiagnosticService