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
import { ensureUsercorrectDataForUpdateMiddleware } from "../middlewares/users/ensureUsercorrectDataForUpdate.middleware";
import { ensureUserDataIsValidMiddleware } from "../middlewares/users/ensureUserDataIsValid.middleware";
import { ensureUserIdIsValidMiddelware } from "../middlewares/users/ensureUserIdIsValid.middelware";
import { ensureUserIsAdmMiddleware } from "../middlewares/users/ensureUserIsAdm.middleware";
import { ensureUsersNoRepeatMiddleware } from "../middlewares/users/ensureUserNoRepeatMiddleware";
import { UpdateUserSchema, UsersWhitoutPassSchema } from "../schemas/users.shemas";

const usersRouter = Router();

<<<<<<< HEAD
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
=======
usersRouter.post("", ensureUserDataIsValidMiddleware(UsersWhitoutPassSchema), ensureUsersNoRepeatMiddleware, createUserController);
usersRouter.patch("/:id",  ensureUsercorrectDataForUpdateMiddleware(UpdateUserSchema), updateUserController)
usersRouter.get("", ensureAuthMiddleware, ensureUserIsAdmMiddleware, getUsersController)
usersRouter.get("/profile", ensureAuthMiddleware, getUserProfileController)
usersRouter.delete("/:id", ensureUserIdIsValidMiddelware, softDeleteUserController)
>>>>>>> 8c90d89eec150a75cd080b69fe012cc5721b334b

usersRouter.get("/profile", ensureAuthMiddleware, getUserProfileController);

usersRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIdIsValidMiddelware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  softDeleteUserController
);

export default usersRouter;
