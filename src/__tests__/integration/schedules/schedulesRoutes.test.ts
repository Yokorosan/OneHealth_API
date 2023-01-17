import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { ScheduledAppointment } from "../../../entities/appoitments.entity";
import { Users } from "../../../entities/user.entity";
import { mockedMedic, mockedUser, mockedUserMedicLogin } from "../../mocks";

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

  test("PACTH /schedules/:id - Should not be able to update schedule without authentication", async () => {
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

  test("PACTH /schedules/:id - Should be able to update schedule", async () => {
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
});
