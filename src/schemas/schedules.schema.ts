import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IScheduleRequest,
  IScheduleResponse,
  IScheduleUpdateRequest,
} from "../interfaces/schedules/schedules.interface";

export const schedulesRequestSchema: SchemaOf<IScheduleRequest> = yup
  .object()
  .shape({
    type: yup.string().required(),
    date: yup.string().required(),
    hour: yup.string().required(),
    user: yup.string().required(),
    medic: yup.string().required(),
  });

export const schedulesResponseSchema: SchemaOf<IScheduleResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    type: yup.string().notRequired(),
    date: yup.string().notRequired(),
    hour: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    user: yup.object().shape({
      id: yup.string().notRequired(),
      name: yup.string().notRequired(),
      email: yup.string().notRequired(),
      phone: yup.string().notRequired(),
    }),
    medic: yup.object().shape({
      id: yup.string().notRequired(),
      name: yup.string().notRequired(),
      email: yup.string().notRequired(),
      phone: yup.string().notRequired(),
    }),
  });



  export const UpdateScheduleSchema: SchemaOf<IScheduleUpdateRequest> = yup
  .object()
  .shape({
    type: yup.string().notRequired(),
    date: yup.string().notRequired(),
    hour: yup.string().notRequired(),
    user: yup.string().required(),
    medic: yup.string().required(), 
  
  })
  .strict(true)
  .noUnknown(true);