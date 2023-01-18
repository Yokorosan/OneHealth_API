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
  mockedUserMedicLoginChanged,
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
    expect(new Date(response.body.date)).toEqual(
      new Date(diagnosticRequest.date)
    );
    expect(response.body.description).toEqual(diagnosticRequest.description);
    expect(response.body.user.id).toEqual(diagnosticRequest.user);
    expect(response.body.medic.id).toEqual(diagnosticRequest.medic);
    expect(response.status).toBe(201);
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
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("name");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("description");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("date");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("description");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("createdAt");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("updatedAt");
    expect(responselistAllDiagnostics.body.diagnostic[0]).not.toHaveProperty("password");
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

    const getUserForEmail = await request(app).get(`/medics/user/${mockedUser.email}`)
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
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("name");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("description");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("date");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("description");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("createdAt");
    expect(responselistAllDiagnostics.body.diagnostic[0]).toHaveProperty("updatedAt");
    expect(responselistAllDiagnostics.body.diagnostic[0]).not.toHaveProperty("password");
  })

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

  test("PATCH /diagnostics/:id - Should not be able to edit without authorization", async () => {
    const response = await request(app).patch(
      "/diagnostics/72b36ef1-d2b7-4c7d-ba5c-4fe4c6281b03"
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /diagnostics/:id - Should not be able to edit the diagnostic without being the medic diagnostic owner", async () => {

    const medicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medicChagedResponse = await request(app)
    .post("/login")
    .send(mockedUserMedicLoginChanged);

      const responselistAllDiagnostics = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/diagnostics/${responselistAllDiagnostics.body.diagnostic[0].id}`)
      .send({ name: "Catapora" })
      .set("Authorization", `Bearer ${medicChagedResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /diagnostics/:id - Should not be able to edit fields of user", async () => {

    const medicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const responselistAllDiagnostics = await request(app)
    .get("/diagnostics/medics")
    .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);


    const response = await request(app)
      .patch(`/diagnostics/${responselistAllDiagnostics.body.diagnostic[0].id}`)
      .send({ user: "90a8caa9-668d-4f7f-b1d8-e404aab16631" })
      .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /diagnostics/:id - Should not be able to edit fields of medic", async () => {

    const medicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const responselistAllDiagnostics = await request(app)
    .get("/diagnostics/medics")
    .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);


    const response = await request(app)
      .patch(`/diagnostics/${responselistAllDiagnostics.body.diagnostic[0].id}`)
      .send({ medic: "90a8caa9-668d-4f7f-b1d8-e404aab16631" })
      .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /diagnostics/:id - Should not be able to accept invalid fields", async () => {

    const medicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const responselistAllDiagnostics = await request(app)
    .get("/diagnostics/medics")
    .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);


    const response = await request(app)
      .patch(`/diagnostics/${responselistAllDiagnostics.body.diagnostic[0].id}`)
      .send({ batata: "doce" })
      .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("error");
    expect(response.body.error[0]).toEqual("name is a required field");
    expect(response.body.error[1]).toEqual("date is a required field");
    expect(response.body.error[2]).toEqual("description is a required field");
  });

  test("PATCH /diagnostics/:id - Must be able to edit diagnostic", async () => {

    const medicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const responselistAllDiagnostics = await request(app)
    .get("/diagnostics/medics")
    .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);


    const response = await request(app)
      .patch(`/diagnostics/${responselistAllDiagnostics.body.diagnostic[0].id}`)
      .send({ name: "Tosse seca", date: "2023/10/11", description: "tosse seca incomodante" })
      .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Tosse seca");
  });

  test("DELETE /diagnostics/:id - Must be able to delete a diagnostic", async () => {
    const createMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const createUserLogin = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const getToBeDeletedMedicDiagnostic = await request(app)
      .get("/diagnostics/medics")
      .set("Authorization", `Bearer ${createMedicLogin.body.token}`);

    const getToBeDeletedUserDiagnostic = await request(app)
      .get(`/users/profile`)
      .set("Authorization", `Bearer ${createUserLogin.body.token}`);

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
