import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import usersRouter from "./routers/users.routers";

const app = express();
app.use(express.json());
app.use("/users", usersRouter)
app.use(handleError);

export default app;
