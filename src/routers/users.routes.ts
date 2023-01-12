import { Router } from "express";
import {
  createUserController,
  getUserProfileController,
  getUsersController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controller";
import { ensureMedicNoRepeatMiddleware } from "../middlewares/medics/ensureMedicsNoRepeat.middleware";
import ensureUserIsAdmOrIsYourOwnIdMiddlware from "../middlewares/sessions/ensureUserIsAdmOrIsYourOwnId.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";
import { ensureUserDataIsValidMiddleware } from "../middlewares/users/ensureUserDataIsValid.middleware";
import { ensureUserIdIsValidMiddelware } from "../middlewares/users/ensureUserIdIsValid.middelware";
import { ensureUserIsAdmMiddleware } from "../middlewares/users/ensureUserIsAdm.middleware";
import { ensureUsersNoRepeatMiddleware } from "../middlewares/users/ensureUserNoRepeatMiddleware";
import { UsersWhitoutPassSchema } from "../schemas/users.shemas";

const usersRouter = Router();

usersRouter.post(
  "",
  ensureUserDataIsValidMiddleware(UsersWhitoutPassSchema),
  ensureUsersNoRepeatMiddleware,
  ensureMedicNoRepeatMiddleware,
  createUserController
);
usersRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIdIsValidMiddelware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  updateUserController
);
usersRouter.get(
  "",
  ensureAuthMiddleware,
  ensureUserIsAdmMiddleware,
  getUsersController
);

usersRouter.get("/profile", ensureAuthMiddleware, getUserProfileController);

usersRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIdIsValidMiddelware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  softDeleteUserController
);

export default usersRouter;
