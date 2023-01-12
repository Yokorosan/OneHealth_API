import { Router } from "express";
import { createUserController, getUserProfileController, getUsersController, softDeleteUserController, updateUserController } from "../controllers/users.controller";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";
import { ensureUsercorrectDataForUpdateMiddleware } from "../middlewares/users/ensureUsercorrectDataForUpdate.middleware";
import { ensureUserDataIsValidMiddleware } from "../middlewares/users/ensureUserDataIsValid.middleware";
import { ensureUserIdIsValidMiddelware } from "../middlewares/users/ensureUserIdIsValid.middelware";
import { ensureUserIsAdmMiddleware } from "../middlewares/users/ensureUserIsAdm.middleware";
import { ensureUsersNoRepeatMiddleware } from "../middlewares/users/ensureUserNoRepeatMiddleware";
import { UpdateUserSchema, UsersWhitoutPassSchema } from "../schemas/users.shemas";

const usersRouter = Router();

usersRouter.post("", ensureUserDataIsValidMiddleware(UsersWhitoutPassSchema), ensureUsersNoRepeatMiddleware, createUserController);
usersRouter.patch("/:id",  ensureUsercorrectDataForUpdateMiddleware(UpdateUserSchema), updateUserController)
usersRouter.get("", ensureAuthMiddleware, ensureUserIsAdmMiddleware, getUsersController)
usersRouter.get("/profile", ensureAuthMiddleware, getUserProfileController)
usersRouter.delete("/:id", ensureUserIdIsValidMiddelware, softDeleteUserController)


export default usersRouter;
