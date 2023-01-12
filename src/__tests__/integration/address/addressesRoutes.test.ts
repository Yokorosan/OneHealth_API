import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { Users } from "../../../entities/user.entity";
import { mockedAddressRequest, mockedUserAdminLogin } from "../../mock";

describe("Create address route tests", () => {
  let connection: DataSource;
  const baseUrl: string = "/address";

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
      .send(mockedUserAdminLogin);

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
      `${baseUrl}/:id${adminLoginResponse.body[0].address}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /address/:id - Should not be able to update id field value", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send({ mockedUserAdminLogin });

    const userRepository = AppDataSource.getRepository(Users);

    const seachUser = await userRepository.findOneBy({
      email: userLoginResponse.body.email,
    });

    const response = await request(app)
      .patch(`${baseUrl}/${seachUser?.address}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({
        id: "13970660-5dbe-423a-9a9d-5c23b37943cf",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /address/:id - Should not be able to update id field value", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send({ mockedUserAdminLogin });

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
      .send({ mockedUserAdminLogin });

    const userRepository = AppDataSource.getRepository(Users);

    const seachUser = await userRepository.findOneBy({
      email: userLoginResponse.body.email,
    });

    const response = await request(app)
      .patch(`${baseUrl}/:${seachUser?.address}`)
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
