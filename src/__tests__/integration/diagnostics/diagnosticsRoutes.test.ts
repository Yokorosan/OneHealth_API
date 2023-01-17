import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedDiagnosticRequest,
  mockedMedic,
  mockedUser,
  mockedUserAdmin,
  mockedUserAdminLogin,
  mockedUserLogin,
  mockedUserMedicLogin,
} from "../../mocks";
describe("/diagnostics", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source Initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /diagnostics - must be able to create a diagnostic", async () => {
    const createUser = await request(app).post("/users").send(mockedUser);
    const createMedic = await request(app).post("/medics").send(mockedMedic);
    const createLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const UserMedicData = {
      user: createUser.body.id,
      medic: createMedic.body.id,
    };

    const diagnosticRequest = { ...mockedDiagnosticRequest, ...UserMedicData };

    const response = await request(app)
      .post("/diagnostics")
      .send(diagnosticRequest)
      .set("Authorization", `Bearer ${createLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("medic");
    expect(response.body.name).toEqual(diagnosticRequest.name);
    expect(new Date(response.body.date)).toEqual(new Date(diagnosticRequest.date));
    expect(response.body.description).toEqual(diagnosticRequest.description);
    expect(response.body.user.id).toEqual(diagnosticRequest.user);
    expect(response.body.medic.id).toEqual(diagnosticRequest.medic);
    expect(response.status).toBe(201);
  });

  test("DELETE /diagnostics/:id - must be able to delete a diagnostic", async () => {
  
    const createMedicLogin = await request(app)
    .post("/login")
    .send(mockedUserMedicLogin);
 

    const createUserLogin = await request(app)
    .post("/login")
    .send(mockedUserLogin);
      
    const getToBeDeletedMedicDiagnostic = await request(app)
    .get("/diagnostics/medics")
    .set("Authorization", `Bearer ${createMedicLogin.body.token}`);


    const  getToBeDeletedUserDiagnostic = await request(app)
    .get(`/users/profile`)
    .set("Authorization", `Bearer ${createUserLogin.body.token}`);



    const response = await request(app)
    .delete(`/diagnostics/${getToBeDeletedMedicDiagnostic.body.diagnostic[0].id}`)
    .set("Authorization", `Bearer ${createMedicLogin.body.token}`);


    
    const getMedicDiagnostic = await request(app)
    .get("/diagnostics/medics")
    .set("Authorization", `Bearer ${createMedicLogin.body.token}`);


    const  getUserDiagnostic = await request(app)
    .get(`/users/profile`)
    .set("Authorization", `Bearer ${createUserLogin.body.token}`);

    

    expect(response.status).toBe(204);
    expect(getMedicDiagnostic.body).toHaveProperty("message");
    expect( getUserDiagnostic.body.diagnostic).toHaveLength(0);


   

 
  });
});
