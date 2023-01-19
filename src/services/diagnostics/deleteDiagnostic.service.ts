import AppDataSource from "../../data-source"
import { Diagnostic } from "../../entities/diagnostic.entity"

const deleteDiagnosticService = async (diagnosticId:string):Promise<Diagnostic[]> => {
    const diagnosticRepository  = AppDataSource.getRepository(Diagnostic)   

    const diagnosticToDelete = await diagnosticRepository.findBy({
        id: diagnosticId
    })

    const deletedDiagnostic = await diagnosticRepository.remove(diagnosticToDelete)

    return deletedDiagnostic
}

export default deleteDiagnosticService