import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import {
  mockedDeletedUser,
  mockedDeletedUserLogin,
  mockedUser,
  mockedUserAdmin,
  mockedUserAdminLogin,
  mockedUserLogin,
} from "../../mocks";
import AppDataSource from "../../../data-source";

describe("/users", () => {
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

  test("POST /users - Must be able to create a user", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Astolfo");
    expect(response.body.phone).toEqual("(19)99999-0000");
    expect(response.body.email).toEqual("astolfo@kenzie.com.br");
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isAdm).toEqual(false);
    expect(response.status).toBe(201);
  });

  test("POST /users - Must not be able to create a user that alredy exists", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /users - Must be able to list all registered Active non medic users", async () => {
    await request(app).post("/users").send(mockedUserAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  test("GET /users - Should not be able to list any kind of user without Authorization", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users - Should not be able to list non medic users, being non admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /users - Should be able to list all registered Active and Not Active  Non Medic Users", async () => {
    await request(app).post("/users").send(mockedDeletedUser);
    const newUserLoginResponse = await request(app)
      .post("/login")
      .send(mockedDeletedUserLogin);
    const findUserToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${newUserLoginResponse.body.token}`);
    await request(app).delete(`/users/${findUserToBeDeleted.body[0].id}`);

    const userAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(3);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  test("DELETE /users/:id - Should be able to soft delete a user", async () => {
    const userAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const findUserToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${findUserToBeDeleted.body[0].id}`
    );
    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUser.body[0].isActive).toBe(false);
  });
});
