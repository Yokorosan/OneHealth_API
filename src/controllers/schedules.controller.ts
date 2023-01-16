import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules/schedules.interface";
import createSchedulesService from "../services/schedules/createSchedules.service";
import { updateSchedulesService } from "../services/schedules/updateSchedules.service";

export const createSchedulesController = async (
  req: Request,
  res: Response
) => {
  const schedule: IScheduleRequest = req.body;

  const data = await createSchedulesService(schedule);

  return res.status(201).json(data);
};


export const updateSchedulesController = (req:Request, res:Response) => {

  const updateSchedule = updateSchedulesService(req.body, req.params.id)

  return res.status(201).json(updateSchedule);
}