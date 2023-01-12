import { Request, Response } from "express";
import { IMedicRequest } from "../interfaces/medics/medics.interface";
import { createMedicService } from "../services/medics/createMedic.service";
import deleteUserMedicService from "../services/medics/deleteUserMedic.service";
import { listMedicsService } from "../services/medics/listMedic.service";
import updateUserMedicService from "../services/medics/updateUserMedic.service";

const createMedicController = async (req: Request, res: Response) => {
  const medicData: IMedicRequest = req.body;

  const newMedic = await createMedicService(medicData);

  return res.status(201).json(newMedic);
};

const listMedicsController = async (req: Request, res: Response) => {
  const medics = await listMedicsService();

  return res.status(200).json(medics);
};

const updateMedicController = async (req: Request, res: Response) => {
  const updatedUserMedic = await updateUserMedicService(
    req.body.params,
    req.body
  );

  return res.status(200).json(updatedUserMedic);
};
const deleteMedicController = async (req: Request, res: Response) => {
  const deletedUserMedic = await deleteUserMedicService(req.params.id);

  return res.status(204).json(deletedUserMedic);
};

export {
  createMedicController,
  listMedicsController,
  updateMedicController,
  deleteMedicController,
};
