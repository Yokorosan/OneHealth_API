import { IDiagnosticRequest, IDiagnosticResponse } from "../../interfaces/diagnostics/diagnostics.interface"
import AppDataSource from "../../data-source"
import { Diagnostic } from "../../entities/diagnostic.entity"
import { diagnosticRequestSchema } from "../../schemas/diagnostics.schema"

const createDiagnosticService = async (newDiagnosticData:IDiagnosticRequest):Promise<IDiagnosticResponse> => {

    const diagnosticRepository = AppDataSource.getRepository(Diagnostic)

    const newDiagnosticInstance = new Diagnostic()
    newDiagnosticInstance.date = newDiagnosticData.date
    newDiagnosticInstance.description = newDiagnosticData.description
    newDiagnosticInstance.medic = newDiagnosticData.medic
    newDiagnosticInstance.name = newDiagnosticData.name
    newDiagnosticInstance.user = newDiagnosticData.user

    const diagnosticSerializer = await diagnosticRequestSchema.validate(newDiagnosticInstance, {
        stripUnknown: true,
        abortEarly: false,
    })

    const createDiagnostic = diagnosticRepository.create(diagnosticSerializer)

    await diagnosticRepository.save(createDiagnostic)

    return createDiagnostic
}

export default createDiagnosticService