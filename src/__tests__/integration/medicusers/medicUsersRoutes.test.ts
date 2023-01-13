import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedDeletedUserLogin,
  mockedDeletedUserMedic,
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

  test("DELETE /medics/:id  - Must be able to delete a medic user", async () => {
    const userMedicLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserMedicLoginChanged);

    const findUserMedicToBeDeleted = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/medics/${findUserMedicToBeDeleted.body.id}`)
      .set("Authorization", `Bearer ${userMedicLoginResponse.body.token}`);

    await request(app).post("/users").send(mockedUserAdmin);

    const userAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);

    const findUserMedic = await request(app)
      .get("/medics")
      .set("Authorization", `Bearer ${userAdminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUserMedic.body[0].isActive).toBe(false);
  });
});
