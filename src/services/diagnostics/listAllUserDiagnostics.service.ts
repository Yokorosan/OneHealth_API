import AppDataSource from "../../data-source";
import { Diagnostic } from "../../entities/diagnostic.entity";
import { AppError } from "../../errors/AppError";
import { allUsersDiagnosticSchema } from "../../schemas/diagnostics.schema"


const listAllMedicDiagnosticService = async (userId:string):Promise<any> => {

    const diagnosticRepository = AppDataSource.getRepository(Diagnostic)

    const queryUserDiagnosticData = await diagnosticRepository.createQueryBuilder("diagnostic")
    .innerJoinAndSelect("diagnostic.user", "user")
    .where("diagnostic.userId = :id", { id:userId
    }).getMany();

    if(!queryUserDiagnosticData){
        throw new AppError("Not found diagnostics for this user!", 404)
    }

    const correctListDiagnosticReturn = await allUsersDiagnosticSchema.validate(queryUserDiagnosticData,{
        stripUnknown: true,
        abortEarly: false,
    })

    return correctListDiagnosticReturn
}

export default listAllMedicDiagnosticService