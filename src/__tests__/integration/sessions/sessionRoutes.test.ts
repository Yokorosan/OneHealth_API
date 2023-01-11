import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedUserAdmin, mockedUserAdminLogin } from "../../mock";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during DataSource Initialization", err);
      });
    await request(app).post("/users").send(mockedUserAdmin);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - should be able to login with the user", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login - should not be a login with the user with wrong password or email", async () => {
    const response = await request(app).post("/login").send({
      email: "astolfo@kenzie.com.br",
      password: "123eE&45",
    });
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /login - should not be able to login with a user that have isActive = false", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    await request(app)
      .delete(`/users/${findUser.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
