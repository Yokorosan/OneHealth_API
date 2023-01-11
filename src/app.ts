import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import addressRoutes from "./routers/address.routes";

const app = express();
app.use(express.json());

app.use(handleError);
app.use("/address", addressRoutes);

export default app;
