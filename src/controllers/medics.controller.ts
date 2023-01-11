import { Request, Response } from "express";
import { createMedicService } from "../services/medics/createMedic.service";
import { listMedicsService } from "../services/medics/listMedic.service";

const createMedicController = async (req: Request, res: Response) => {
  const newMedic = await createMedicService(req.body);

  return res.status(201).json(newMedic);
};

const listMedicsController = async (req: Request, res: Response) => {
  const medics = await listMedicsService();

  return res.status(200).json(medics);
};

export { createMedicController, listMedicsController };
