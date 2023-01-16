import { IDiagnosticRequest, IDiagnosticResponse } from "../../interfaces/diagnostics/diagnostics.interface"
import { Diagnostic } from "../../entities/diagnostic.entity"
import { Users } from "../../entities/user.entity"
import { UsersMedic } from "../../entities/usermedic.entity"
import AppDataSource from "../../data-source"
import { diagnosticResponseSchema } from "../../schemas/diagnostics.schema"

const createDiagnosticService = async (newDiagnosticData:IDiagnosticRequest): Promise<IDiagnosticResponse> => {

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

     const correctDiagnosticReturn = await diagnosticResponseSchema.validate(createDiagnostic, {
        stripUnknown: true,
        abortEarly: false,
     })

     return correctDiagnosticReturn
}

export default createDiagnosticService