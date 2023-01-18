import request from "supertest";
import { DataSource } from "typeorm";
import { textSpanEnd } from "typescript";
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
    const Login = await request(app).post("/login").send(mockedUserMedicLogin);

    const diagnosticRequest = {
      ...mockedDiagnosticRequest,
      user: createUser.body.id,
      medic: createMedic.body.id,
    };

    const response = await request(app)
      .post("/diagnostics")
      .send(diagnosticRequest)
      .set("Authorization", `Bearer ${Login.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("medic");
    expect(response.body.name).toEqual(diagnosticRequest.name);
    expect(new Date(response.body.date)).toEqual(
      new Date(diagnosticRequest.date)
    );
    expect(response.body.description).toEqual(diagnosticRequest.description);
    expect(response.body.user.id).toEqual(diagnosticRequest.user);
    expect(response.body.medic.id).toEqual(diagnosticRequest.medic);
    expect(response.status).toBe(201);
  });

  test("POST /diagnostics - must not be able to create a diagnostic if user is not medic", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const medicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const findMedic = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${medicLogin.body.token}`);

    const findUser = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const diagnosticRequest = {
      ...mockedDiagnosticRequest,
      user: findUser.body.id,
      medic: findMedic.body.id,
    };

    const response = await request(app)
      .post("/diagnostics")
      .send(diagnosticRequest)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

     expect(response.body).toHaveProperty("message");
     expect(response.status).toBe(403);
  });

  test("POST /diagnostics - must not be able to create a diagnostic if data is incomplete", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const medicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const findMedic = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${medicLogin.body.token}`);

    const findUser = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const diagnosticRequest = {
      ...mockedDiagnosticRequest,
      medic: findMedic.body.id,
    };

    const response = await request(app)
      .post("/diagnostics")
      .send(diagnosticRequest)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

     expect(response.body).toHaveProperty("error");
     expect(response.status).toBe(400);
  });

  test("POST /diagnostics - must not be able to create a diagnostic if user is not authenticated", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const medicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const findMedic = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${medicLogin.body.token}`);

    const findUser = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const diagnosticRequest = {
      ...mockedDiagnosticRequest,
      user: findUser.body.id,
      medic: findMedic.body.id,
    };

    const response = await request(app)
      .post("/diagnostics")
      .send(diagnosticRequest)
      .set("Authorization", `Bearer e`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /diagnostics/medics - Should be able to list all diagnostics of Medic", async () => {
    const userMedciLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const responselistAllDiagnostics = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${userMedciLoginResponse.body.token}`);

    expect(responselistAllDiagnostics.body.diagnostic).toHaveLength(1);
    expect(responselistAllDiagnostics.body).toHaveProperty("id");
    expect(responselistAllDiagnostics.body).toHaveProperty("name");
    expect(responselistAllDiagnostics.body).toHaveProperty("email");
    expect(responselistAllDiagnostics.body).toHaveProperty("phone");
    expect(responselistAllDiagnostics.body).toHaveProperty("diagnostic");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("id");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "name"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "description"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "date"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "description"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "createdAt"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "updatedAt"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).not.toHaveProperty(
      "password"
    );
  });

  test("GET /diagnostics/medics - Must not be able to list a doctor's diagnoses without authentication", async () => {
    const response = await request(app).get("/diagnostics/medics");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /diagnostics/medics - Must not be able to list a diagnostics without being a medic", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);

    const response = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);


    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /diagnostics/:id - Should be able to list all diagnostics of User", async () => {
    const userMedciLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const getUserForEmail = await request(app)
      .get(`/medics/user/${mockedUser.email}`)
      .set("Authorization", `Bearer ${userMedciLoginResponse.body.token}`);

    const responselistAllDiagnostics = await request(app)
      .get(`/diagnostics/${getUserForEmail.body.id}`)
      .set("Authorization", `Bearer ${userMedciLoginResponse.body.token}`);

    expect(responselistAllDiagnostics.body.diagnostic).toHaveLength(1);
    expect(responselistAllDiagnostics.body).toHaveProperty("id");
    expect(responselistAllDiagnostics.body).toHaveProperty("name");
    expect(responselistAllDiagnostics.body).toHaveProperty("email");
    expect(responselistAllDiagnostics.body).toHaveProperty("phone");
    expect(responselistAllDiagnostics.body).toHaveProperty("diagnostic");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("id");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "name"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "description"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "date"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "description"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "createdAt"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty(
      "updatedAt"
    );
    expect(responselistAllDiagnostics.body.diagnostic[0]).not.toHaveProperty(
      "password"
    );
  });

  test("DELETE /diagnostics/:id - must not be able to delete a diagnostic if user is not authenticated", async () => {
    const createMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

  
    
    const getToBeDeletedMedicDiagnostic = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${createMedicLogin.body.token}`);


    const response = await request(app)
      .delete(
        `/diagnostics/${getToBeDeletedMedicDiagnostic.body.diagnostic[0].id}`
      )
      .set("Authorization", `Bearer eeeeee`);


    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
 
  });



  test("DELETE /diagnostics/:id - must not be able to delete a diagnostic if user is not the medic who created th diagnostic ", async () => {
    const createMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

  
    
    const getToBeDeletedMedicDiagnostic = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${createMedicLogin.body.token}`);


    const response = await request(app)
      .delete(
        `/diagnostics/${getToBeDeletedMedicDiagnostic.body.diagnostic[0].id}`
      )
      .set("Authorization", `Bearer eeeeee`);


    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
 
  });




  test("GET /diagnostics/:id - Must not be able to list diagnostics of a user without authentication", async () => {
    const response = await request(app).get("/diagnostics/:id");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /diagnostics/:id - Must not be able to list a diagnostics without being a medic", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);

    const response = await request(app)
      .get(`/diagnostics/:id`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);


    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
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


    const response = await request(app)
      .delete(
        `/diagnostics/${getToBeDeletedMedicDiagnostic.body.diagnostic[0].id}`
      )
      .set("Authorization", `Bearer ${createMedicLogin.body.token}`);

    const getMedicDiagnostic = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${createMedicLogin.body.token}`);

    const getUserDiagnostic = await request(app)
      .get(`/users/profile`)
      .set("Authorization", `Bearer ${createUserLogin.body.token}`);

    expect(response.status).toBe(204);
    expect(getMedicDiagnostic.body).toHaveProperty("message");
    expect(getUserDiagnostic.body.diagnostic).toHaveLength(0);
  });

  
});




