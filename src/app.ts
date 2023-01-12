import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import usersRouter from "./routers/users.routes";
import MedicsRoutes from "./routers/medics.routes";
import sessionRoutes from "./routers/session.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/medics", MedicsRoutes);
app.use("/login", sessionRoutes);

app.use(handleError);

export default app;
