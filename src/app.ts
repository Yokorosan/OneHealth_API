import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import { sessionRoutes } from "./routers/session.routers";

const app = express();
app.use(express.json());

app.use("/login", sessionRoutes);

app.use(handleError);

export default app;
