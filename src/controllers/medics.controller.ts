import { Request, Response } from "express";
import { IMedicRequest } from "../interfaces/medics/medics.interface";
import { createMedicService } from "../services/medics/createMedic.service";
import { deleteMedicService } from "../services/medics/deleteMedic.service";
import { listMedicsService } from "../services/medics/listMedic.service";
import { updateMedicService } from "../services/medics/updateMedic.service";

const createMedicController = async (req: Request, res: Response) => {
  const medicData: IMedicRequest = req.body;

  const newMedic = await createMedicService(medicData);

  return res.status(201).json(newMedic);
};

const listMedicsController = async (req: Request, res: Response) => {
  const medics = await listMedicsService();
  //req.user.isAdm, req.user.isUser

  return res.status(200).json(medics);
};

const updateMedicController = async (req: Request, res: Response) => {
  const updatedUserMedic = await updateMedicService(req.body.params, req.body);

  return res.status(200).json(updatedUserMedic);
};

const deleteMedicController = async (req: Request, res: Response) => {
  const deletedUserMedic = await deleteMedicService(req.params.id);

  return res.status(204).json(deletedUserMedic);
};

export {
  createMedicController,
  listMedicsController,
  updateMedicController,
  deleteMedicController,
};
