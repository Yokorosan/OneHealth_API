import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules/schedules.interface";
import createSchedulesService from "../services/schedules/createSchedules.service";

export const createSchedulesController = async (
  req: Request,
  res: Response
) => {
  const medicId = req.user;

  const schedule: IScheduleRequest = req.body;

  const data = await createSchedulesService(schedule, medicId);

  return res.status(201).json(data);
};
