import * as yup from "yup";
import { SchemaOf } from "yup";
import { IScheduleRequest } from "../interfaces/schedules/schedules.interface";

export const schedulesRequestSchema: SchemaOf<IScheduleRequest> = yup
  .object()
  .shape({
    type: yup.string().required(),
    date: yup.string().required(),
    hour: yup.string().required(),
    user: yup.string().required(),
    medic: yup.string().required(),
  });
