import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import {
  mockedDeletedUser,
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

  test("GET /users - Should be able to list all registered Active and Not Active Non Medic Users", async () => {
    await request(app).post("/users").send(mockedDeletedUser);

    await request(app).post("/users").send(mockedUserAdmin);

    const userAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const findUserToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    await request(app)
      .delete(`/users/${findUserToBeDeleted.body[1].id}`)
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(3);
    expect(response.body[0]).not.toHaveProperty("password");
    expect(response.body[1].isActive).toBe(false);
  });

  test("PATCH /users/:id - Should not be able to edit without authorization", async () => {
    const response = await request(app).patch(
      "/users/91da6c72-8a48-458c-9cd3-48ff730b3215"
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to change another user without being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);

    const userAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const userAdminId = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${userAdminId.body.id}`)
      .send({ name: "Caroline" })
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Should not be able to edit isActive, isAdm or Id", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);

    const userId = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${userId.body.id}`)
      .send({ isActive: false, isAdm: true, id: "salsicha" })
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - should not be able to edit email to an alredy existing email", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);

    const userId = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${userId.body.id}`)
      .send({ email: "mikhail@kenzie.com.br" })
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Admin should be able to edit user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);

    const userId = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const userAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const response = await request(app)
      .patch(`/users/${userId.body.id}`)
      .send({ name: "Mikhail" })
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Mikhail");
  });

  test("PATCH /users/:id - should be able to edit user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);

    const userId = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${userId.body.id}`)
      .send({ name: "Caroline" })
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Caroline");
  });

  test("DELETE /users/:id - Should not be able to delete a user without Authorization", async () => {
    const userAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const findUserToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${findUserToBeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id - Should be able to soft delete a user", async () => {
    const userAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const findUserToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${findUserToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUser.body[0].isActive).toBe(false);
  });
});
