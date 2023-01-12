import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import { sessionRoutes } from "./routers/session.routes";

import doctorsRoutes from "./routers/medics.routes";
import usersRouter from "./routers/users.routes";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);
app.use("/medics", doctorsRoutes);
app.use("/login", sessionRoutes);

app.use(handleError);

export default app;
