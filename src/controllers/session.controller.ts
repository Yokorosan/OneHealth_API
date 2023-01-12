import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users/user.interface";
import createSessionMedicService from "../services/sessions/createSessionUser.service";
import createSessionUserService from "../services/sessions/createSessionUser.service";

const createSessionController = async (
  request: Request,
  response: Response
) => {
  const bodyRequest: IUserLogin = request.body;

  const token = await createSessionUserService(bodyRequest);

  return response.json(token);
};

export { createSessionController };
