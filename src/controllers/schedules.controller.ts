import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules/schedules.interface";
import createSchedulesService from "../services/schedules/createSchedules.service";
import { deleteScheduleService } from "../services/schedules/deleteSchedule.service";

import { updateScheduleService } from "../services/schedules/updateSchedules.service";

export const createSchedulesController = async (
  req: Request,
  res: Response
) => {
  const schedule: IScheduleRequest = req.body;
  const data = await createSchedulesService(schedule);

  return res.status(201).json(data);
};

export const deleteScheduleController = async (req: Request, res: Response) => {
  await deleteScheduleService(req.params.id);

  return res.status(204).send();
};


export const updateScheduleController = async (req: Request, res: Response) => {
 const updateSchedule = await updateScheduleService(req.body ,req.params.id);

  return res.status(201).json(updateSchedule);
};


