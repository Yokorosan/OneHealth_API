import { Request, Response } from "express";
import { updateUserService } from "../services/users/updateUsers.service";
import { createUserService } from "../services/users/createUsers.service";
import { softDeleteUserService } from "../services/users/softDeleteUsers.service";
import { getUsersService } from "../services/users/getUsers.service";

export const createUserController = async (req: Request, res: Response) => {
  const createUser = await createUserService(req.body);
  return res.status(201).json(createUser);
};

export const updateUserController = async (req: Request, res: Response) => {
  const updateUser = await updateUserService(req.body, req.params.id);
  return res.status(200).json(updateUser);
};


export const getUsersController = async (req: Request, res: Response) => {
 const getUsers = await getUsersService();
  return res.status(200).json(getUsers)
}

export const softDeleteUserController = async (req: Request, res: Response) => {
   await softDeleteUserService(req.params.id);
  return res.status(204).send()
};

