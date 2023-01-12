import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { UsersMedic } from "../../../entities/usermedic.entity";
import {
  mockedAddressRequest,
  mockedMedic,
  mockedUser,
  mockedUserAdmin,
  mockedUserAdminLogin,
  mockedUserLogin,
  mockedUserMedicLogin,
} from "../../mocks";

describe("Address route tests", () => {
  let connection: DataSource;
  const baseUrl: string = "/address";
  const baseUrl2: string = "/address_medic";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source Initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedUserAdmin);
    await request(app).post("/medics").send(mockedMedic);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /address - Should not be able to create address without authentication", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedAddressRequest);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /address - Must be able to create a adress", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const reponse = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedAddressRequest);

    expect(reponse.body).toHaveProperty("id");
    expect(reponse.body).toHaveProperty("district");
    expect(reponse.body).toHaveProperty("zipCode");
    expect(reponse.body).toHaveProperty("number");
    expect(reponse.body).toHaveProperty("city");
    expect(reponse.body).toHaveProperty("state");
    expect(reponse.status).toBe(201);
  });

  test("PATCH /address/:id - Should not be able to update address without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const response = await request(app).patch(
      `${baseUrl}/${adminLoginResponse.body.address}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /address/:id - Should not be able to update id field value", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const address = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedAddressRequest);

    const response = await request(app)
      .patch(`${baseUrl}/${address.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        id: "13970660-5dbe-423a-9a9d-5c23b37943cf",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("PATCH /address/:id - Must not be able to update address with invalid id", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const response = await request(app)
      .patch(`${baseUrl}/:13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        district: "Rua José Vicente",
        zipCode: "05838018",
        number: "50",
        city: "São Paulo",
        state: "SP",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /address/:id - Should be able to update address", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const address = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedAddressRequest);

    const response = await request(app)
      .patch(`${baseUrl}/${address.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        district: "Rua José Vicente",
        zipCode: "05838018",
        number: "50",
        city: "São Paulo",
        state: "SP",
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("district");
    expect(response.body).toHaveProperty("zipCode");
    expect(response.body).toHaveProperty("number");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("state");
    expect(response.status).toBe(200);
  });

  test("PATCH /address_medic/:id - Must not be able to update doctor address without authentication", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const response = await request(app).patch(
      `${baseUrl2}/${userLoginResponse.body.address}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /address_medic/:id - Should not be able to update id field value", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const addressMedicRepository = AppDataSource.getRepository(UsersMedic);

    const addressMedic = await addressMedicRepository.findOneBy({
      email: mockedUserMedicLogin.email,
    });

    const response = await request(app)
      .patch(`${baseUrl2}/${addressMedic?.address}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        id: "13970660-5dbe-423a-9a9d-5c23b37943cf",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("PATCH /address_medic/:id - Should not be able to update doctor address with invalid id", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const addressMedicRepository = AppDataSource.getRepository(UsersMedic);

    await addressMedicRepository.findOneBy({
      email: mockedUserMedicLogin.email,
    });

    const response = await request(app)
      .patch(`${baseUrl2}/:13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        district: "Rua José Vicente",
        zipCode: "05838018",
        number: "50",
        city: "São Paulo",
        state: "SP",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /address_medic/:id - Should be able to update address", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const addressMedicRepository = AppDataSource.getRepository(UsersMedic);

    const medic = await addressMedicRepository.findOneBy({
      email: mockedUserMedicLogin.email,
    });

    const response = await request(app)
      .patch(`${baseUrl2}/${medic?.address}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        district: "Rua José Vicente",
        zipCode: "05838018",
        number: "50",
        city: "São Paulo",
        state: "SP",
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("district");
    expect(response.body).toHaveProperty("zipCode");
    expect(response.body).toHaveProperty("number");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("state");
    expect(response.status).toBe(200);
  });
});
