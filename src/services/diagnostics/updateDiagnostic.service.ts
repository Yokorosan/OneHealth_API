import AppDataSource from "../../data-source";
import { Diagnostic } from "../../entities/diagnostic.entity";
import { IDiagnosticResponse, IDiagnosticUpdate } from "../../interfaces/diagnostics/diagnostics.interface";

const updateDiagnosticService = async (diagnosticId:string, newDataDiagnostic:IDiagnosticUpdate): Promise<IDiagnosticResponse> => {
    
    const diagnosticRepository = AppDataSource.getRepository(Diagnostic)

    const foundDiagnostic = await diagnosticRepository.findOneBy({
        id:diagnosticId
    })

    const updateDiagnostic = diagnosticRepository.create({
        ...foundDiagnostic,
        ...newDataDiagnostic
    })

    await diagnosticRepository.update(diagnosticId,newDataDiagnostic)

    return updateDiagnostic
}

export default updateDiagnosticService