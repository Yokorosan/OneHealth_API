import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ISchedulesUserResponse,
  IUserRequest,
  IUserResponse,
  IUserUpdateRequest,
} from "../interfaces/users/user.interface";
import { diagnosticOfUserResponseSchema } from "./diagnostics.schema";
import { schedulesOfUserResponseSchema } from "./schedules.schema";

export const UsersWhitoutPassSchema: SchemaOf<IUserRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    isAdm: yup.boolean().notRequired(),
    address: yup
      .object()
      .shape({
        district: yup.string().notRequired(),
        zipCode: yup.string().notRequired(),
        number: yup.string().notRequired(),
        city: yup.string().notRequired(),
        state: yup.string().notRequired(),
      })
      .notRequired(),
  });

export const UsersWhitoutPassSchemaResponse: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    password: yup.string().strip().notRequired(),
    phone: yup.string().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    address: yup
      .object()
      .shape({
        id: yup.string().notRequired(),
        district: yup.string().notRequired(),
        zipCode: yup.string().notRequired(),
        number: yup.string().notRequired(),
        city: yup.string().notRequired(),
        state: yup.string().notRequired(),
      })
      .notRequired(),
  });

export const UpdateUserSchema: SchemaOf<IUserUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    address: yup
      .object()
      .shape({
        district: yup.string().notRequired(),
        zipCode: yup.string().notRequired(),
        number: yup.string().notRequired(),
        city: yup.string().notRequired(),
        state: yup.string().notRequired(),
      })
      .notRequired(),
  })
  .strict(true)
  .noUnknown(true);

export const schedulesUserResponseSchema: SchemaOf<ISchedulesUserResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    diagnostic: yup.array(diagnosticOfUserResponseSchema),
    appointment: yup.array(schedulesOfUserResponseSchema),
  });

export const GetUsersSchema: SchemaOf<IUserResponse[]> = yup
  .array()
  .of(UsersWhitoutPassSchemaResponse);
