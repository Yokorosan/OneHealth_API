import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import { sessionRoutes } from "./routers/session.routers";
import addressRoutes from "./routers/address.routes";
import doctorsRoutes from "./routers/doctors.routes";


const app = express();
app.use(express.json());
app.use("/users", usersRouter)
app.use("/medics", doctorsRoutes);
app.use("/address", addressRoutes);
app.use("/login", sessionRoutes);

app.use(handleError);


export default app;
