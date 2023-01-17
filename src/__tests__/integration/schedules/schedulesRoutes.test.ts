import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { ScheduledAppointment } from "../../../entities/appoitments.entity";
import { Users } from "../../../entities/user.entity";
import {
  mockedMedic,
  mockedUser,
  mockedUserLogin,
  mockedUserMedicLogin,
} from "../../mocks";

describe("Schedules route tests", () => {
  let connection: DataSource;
  const baseUrl: string = "/schedules";
  const userRepo: Repository<Users> = AppDataSource.getRepository(Users);
  const schedulesRepo: Repository<ScheduledAppointment> =
    AppDataSource.getRepository(ScheduledAppointment);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source Initialization", err);
      });

    await request(app).post("/medics").send(mockedMedic);
  });

  beforeEach(async () => {
    const schedule = await schedulesRepo.find();
    await schedulesRepo.remove(schedule);

    const user = await userRepo.find();
    await userRepo.remove(user);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /schedules - Cannot create a schedule without authentication", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    const response = await request(app).post(baseUrl).send({
      type: "Consulta",
      date: "10/03/2023",
      hour: "16:30",
      user: user.body.id,
      medic: medic.body.id,
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /schedules - Should be able to create a schedule", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.medic).toHaveProperty("id");
    expect(response.body.medic).toHaveProperty("phone");
    expect(response.body.medic).toHaveProperty("email");
    expect(response.body.medic).toHaveProperty("name");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("phone");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user).toHaveProperty("name");
    expect(response.status).toBe(201);
  });

  test("POST /schedules - Cannot create a schedule that already exists", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("PATCH /schedules/:id - Should not be able to update id field value", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    const schedule = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app)
      .patch(`${baseUrl}/${schedule.body.id}`)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        id: "13970660-5dbe-423a-9a9d-5c23b37943cf",
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toEqual(`${schedule.body.id}`);
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.status).toBe(200);
  });

  test("PATCH/schedules/:id - Should not be able to update schedule without authentication", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    const schedule = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app)
      .patch(`${baseUrl}/${schedule.body.id}`)
      .send({
        type: "Exame",
        date: "10/03/2023",
        hour: "17:30",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /schedules/:id - Must not be able to update schedule with invalid id", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app)
      .patch(`${baseUrl}/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Exame",
        date: "10/03/2023",
        hour: "17:30",
      });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /schedules/:id - Should be able to update schedule", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    const schedule = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app)
      .patch(`${baseUrl}/${schedule.body.id}`)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Exame",
        date: "10/03/2023",
        hour: "17:30",
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.status).toBe(200);
  });

  test("GET /schedules/medics - Should be able to update schedule", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app).get(`${baseUrl}/medics`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /schedules/medics - Only doctors should be able to list schedules", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app)
      .get(`${baseUrl}/medics`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /schedules/medics - It should be possible to list all of a doctor's schedules", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app)
      .get(`${baseUrl}/medics`)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.appointment[0]).toHaveProperty("id");
    expect(response.body.appointment[0]).toHaveProperty("type");
    expect(response.body.appointment[0]).toHaveProperty("date");
    expect(response.body.appointment[0]).toHaveProperty("hour");
    expect(response.body.appointment[0]).toHaveProperty("updatedAt");
    expect(response.body.appointment[0]).toHaveProperty("createdAt");
    expect(response.body.appointment[0].user).toHaveProperty("name");
    expect(response.body.appointment[0].user).toHaveProperty("email");
    expect(response.body.appointment[0].user).toHaveProperty("phone");
    expect(response.body.appointment).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("DELETE /schedules/:id - Must not be able to delete a schedule without authentication", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    const schedule = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app).delete(
      `${baseUrl}/${schedule.body.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /schedules/:id - Should be able to soft delete a schedule", async () => {
    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const response = await request(app)
      .delete(`${baseUrl}/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /schedules/:id - Should be able to soft delete a schedule", async () => {
    const user = await request(app).post("/users").send(mockedUser);

    const userMedicLogin = await request(app)
      .post("/login")
      .send(mockedUserMedicLogin);

    const medic = await request(app)
      .get("/medics/profile")
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    const schedule = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`)
      .send({
        type: "Consulta",
        date: "10/03/2023",
        hour: "16:30",
        user: user.body.id,
        medic: medic.body.id,
      });

    const response = await request(app)
      .delete(`${baseUrl}/${schedule.body.id}`)
      .set("Authorization", `Bearer ${userMedicLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
