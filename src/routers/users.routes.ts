import { Router } from "express";
import { createUserController, softDeleteUserController, updateUserController } from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.post("", createUserController);
usersRouter.patch("", updateUserController)
usersRouter.delete("", softDeleteUserController)

export default usersRouter;
