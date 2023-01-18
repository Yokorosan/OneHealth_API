import { Router } from "express";
import {
  createUserController,
  getUserProfileController,
  getUsersController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controller";
import { ensureEmailIsUniqueMiddleware } from "../middlewares/sessions/ensureEmailIsUnique.middleware";
import ensureUserIsAdmOrIsYourOwnIdMiddlware from "../middlewares/sessions/ensureUserIsAdmOrIsYourOwnId.middleware";
import ensureUuidIsValidMiddleware from "../middlewares/sessions/ensureUuidIsValid.middleware";
import ensureAuthMiddleware from "../middlewares/sessions/esureAuth.middleware";
import ensureAddressFieldsAreCorrectMiddleware from "../middlewares/users/ensureQuantityOfCharacters.middleware";
import ensureQuantityOfCharactersMiddleware from "../middlewares/users/ensureQuantityOfCharacters.middleware";
import { ensureUsercorrectDataForUpdateMiddleware } from "../middlewares/users/ensureUsercorrectDataForUpdate.middleware";
import { ensureUserDataIsValidMiddleware } from "../middlewares/users/ensureUserDataIsValid.middleware";
import { ensureUserIdIsValidMiddelware } from "../middlewares/users/ensureUserIdIsValid.middelware";
import ensureUserIsActiveMiddleware from "../middlewares/users/ensureUserIsActive.middleware";
import { ensureUserIsAdmMiddleware } from "../middlewares/users/ensureUserIsAdm.middleware";
import { ensureUsersNoRepeatMiddleware } from "../middlewares/users/ensureUserNoRepeatMiddleware";
import {
  UpdateUserSchema,
  UsersWhitoutPassSchema,
} from "../schemas/users.schema";

const usersRouter = Router();

usersRouter.post(
  "",
  ensureUserDataIsValidMiddleware(UsersWhitoutPassSchema),
  ensureQuantityOfCharactersMiddleware,
  ensureAddressFieldsAreCorrectMiddleware,
  ensureUsersNoRepeatMiddleware,
  createUserController
);
usersRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUuidIsValidMiddleware,
  ensureUserIdIsValidMiddelware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  ensureUsercorrectDataForUpdateMiddleware(UpdateUserSchema),
  ensureEmailIsUniqueMiddleware,
  ensureUserIsActiveMiddleware,
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
  ensureUuidIsValidMiddleware,
  ensureUserIdIsValidMiddelware,
  ensureUserIsAdmOrIsYourOwnIdMiddlware,
  ensureUserIsActiveMiddleware,
  softDeleteUserController
);

export default usersRouter;
