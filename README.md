# OneHealth_API

Tecnologias Utilizadas
Express.js, TypeOrm, Typescript, Jest, bycrpytJS, JsonWebToken, PostgreSQL

Padronizações

Projeto iniciado com Yarn.

Linguagem utilizada: Inglês

Nome dos Bancos de Dados:
onehealth_database 

Nomeação das variaveis:
CamelCase

Nome das Tabelas:

Address(Endereço)
User(Paciente)
User_Medic(Medico)
Scheduled_Appointment(Consultas Marcadas)
Diagnostic(Diagnósticos)

Padronização Controllers
address.controller.ts
users.controller.ts
appointment.controller.ts
diagnostic.controller.ts

Padronizações para arquivos de services:
"nome da funcionalidade".services.ts
ex: createUserMedic.service.ts
 -Dentro do arquivo a função devera ter um nome similar
  ex: createUserMedicService

Padronizações para arquivos de middleware:
"nome do middleware".middleware.ts

ex: verifyExistUser.middleware.ts
 -Dentro do arquivo a função devera ter um nome similar
  ex: verifyExistUserMiddleware.ts
 
Padronização Interfaces
Todas as interfaces começam com I para indicar que são interfaces typescript
ex: IUserMedic 

Padronização Schemas/Yup
O nome dos schemas vão ser baseados na interface que está sendo usada para monta-lo ou no que ele está fazendo.

registerUserMedic => Fala que é o schema usado para tratar as informações que vem no corpo da requisição antes de serem inseridas na API
registerUserMedicResponse => fala que é o schema usado para tratar a resposta que o usuário vai receber ao cadastrar um médico.

Lembretes Gerais
Tentar Manter apenas uma função por arquivo / service, as únicas excessões seram os controllers/interfaces/schemas que vão ter vários exports dentro do arquivo.
