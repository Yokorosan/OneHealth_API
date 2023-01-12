import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";

import sessionRoutes from "./routers/session.routes";
import usersRouter from "./routers/users.routes";
import medicsRoutes from "./routers/medics.routes";
import addressRoutes from "./routers/address.routes";
import addressMedicRoutes from "./routers/addressMedic.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/medics", medicsRoutes);
app.use("/login", sessionRoutes);
app.use("/address", addressRoutes);
app.use("/address_medic", addressMedicRoutes);

app.use(handleError);

export default app;
