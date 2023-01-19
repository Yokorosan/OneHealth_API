import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedMedic,
  mockedUserAdmin,
  mockedUserAdminLogin,
  mockedUserMedicLogin,
  mockedUserMedicLoginChanged,
} from "../../mocks";

describe("/medics", () => {
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

  test("POST /medics - Must be able to create a medic user", async () => {
    const response = await request(app).post("/medics").send(mockedMedic);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isWhatsApp");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("speciality");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("zipCode");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
    expect(response.status).toBe(201);
  });

  test("POST /medics - Should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/medics").send(mockedMedic);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /medics/profile - Must be able to list your own profile", async () => {
    const medicResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);
    const response = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${medicResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isWhatsApp");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("speciality");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("zipCode");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
  });

  test("GET /medics - Should not be able to list your own profile without authentication", async () => {
    const response = await request(app).get("/medics");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /medics - Should not be able to list other medics being a medic", async () => {
    const medicLoginResponse = await request(app)
      .post("/login")
      .send(mockedMedic);
    const response = await request(app)
      .get("/medics")
      .set("Authorization", `Bearer ${medicLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("PATCH /medics/:id  - Must be able to update a medic user", async () => {
    const newValues = { name: "Darth Vader", email: "vader@kenzie.com.br" };

    const userMedicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const findUserMedicToBeEdited = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/medics/${findUserMedicToBeEdited.body.id}`)
      .send(newValues)
      .set("Authorization", `Bearer ${userMedicLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Darth Vader");
    expect(response.body.email).toEqual("vader@kenzie.com.br");
    expect(response.body).not.toHaveProperty("password");
  });

  test("PATCH /medics/:id - Should not be able to update medic without authentication", async () => {
    await request(app).post("/users").send(mockedUserAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const medicToBeUpdated = await request(app)
      .get("/medics")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/medics/${medicToBeUpdated.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /medics/:id - Should not be able to update medic with invalid id", async () => {
    const newValues = {
      name: "Naruto Uzumaki",
      email: "narutoDeKonoha@mail.com",
    };
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const token = `Bearer ${adminLoginResponse.body.token}`;

    const medicToBeUpdatedRequest = await request(app)
      .get("/medics")
      .set("Authorization", token);
    const medicToBeUpdateId = medicToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch(`/medics/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /medics/:id - Should not be able to update isActive field value", async () => {
    const newValues = { isActive: false };

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const token = `Bearer ${adminLoginResponse.body.token}`;

    const medicToBeUpdatedRequest = await request(app)
      .get("/medics")
      .set("Authorization", token);
    const medicToBeUpdatedId = medicToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch(`/medics/${medicToBeUpdatedId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /medics/:id - should not be able to update id field value", async () => {
    const newValues = { id: "Batata" };

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const token = `Bearer ${adminLoginResponse.body.token}`;

    const medicToBeUpdatedRequest = await request(app)
      .get("/medics")
      .set("Authorization", token);
    const medicToBeUpdatedId = medicToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch(`/medics/${medicToBeUpdatedId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /medics/:id - Should not be able to update another medic", async () => {
    const newValues = {
      name: "Izuku Midoriya",
      email: "theBestIsAllMigth@mail.com",
    };

    const medicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const medicToken = `Bearer ${medicLoginResponse.body.token}`;
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const medicToBeUpdatedRequest = await request(app)
      .get("/medics")
      .set("Authorization", adminToken);
    const medicToBeUpdatedId = medicToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch(`/medics/${medicToBeUpdatedId}`)
      .set("Authorization", medicToken)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /medics/:id - Should not be able to delete another medic ", async () => {
    const medicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const medicToken = `Bearer ${medicLoginResponse.body.token}`;
    const adminToken = `Bearer ${adminLoginResponse.body.token}`;

    const medicToBeDeletedRequest = await request(app)
      .get("/medics")
      .set("Authorization", adminToken);
    const medicToBeUpdatedId = medicToBeDeletedRequest.body[0].id;

    const response = await request(app)
      .delete(`/medics/${medicToBeUpdatedId}`)
      .set("Authorization", medicToken);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /medics/:id - Should not be able to delete medic without authentication", async () => {
    const AdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const token = `Bearer ${AdminLoginResponse.body.token}`;

    const medicToBeDeleted = await request(app)
      .get(`/medics`)
      .set("Authorization", token);

    const response = await request(app).delete(
      `/medics/${medicToBeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /medics/:id  - Must be able to soft delete your own medic user", async () => {
    const userMedicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLoginChanged);

    const findUserMedicToBeDeleted = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/medics/${findUserMedicToBeDeleted.body.id}`)
      .set("Authorization", `Bearer ${userMedicLoginResponse.body.token}`);

    const medicAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const findUserMedic = await request(app)
      .get("/medics")
      .set("Authorization", `Bearer ${medicAdminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUserMedic.body[0].isActive).toBe(false);
  });

  test("DELETE /medics/:id - Shouldn't be able to delete user with isActive = false", async () => {
    const AdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const token = `Bearer ${AdminLoginResponse.body.token}`;

    const medicToBeDeleted = await request(app)
      .get(`/medics`)
      .set("Authorization", token);

    const response = await request(app)
      .delete(`/medics/${medicToBeDeleted.body[0].id}`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("DELETE /medics/:id - Should not be able to delete user with invalid id", async () => {
    const AdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const token = `Bearer ${AdminLoginResponse.body.token}`;

    const response = await request(app)
      .delete(`/medics/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
