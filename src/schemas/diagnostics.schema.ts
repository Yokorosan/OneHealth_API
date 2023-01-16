import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IDiagnosticListResponse,
  IDiagnosticRequest,
  IDiagnosticResponse,
} from "../interfaces/diagnostics/diagnostics.interface";

export const diagnosticRequestSchema: SchemaOf<IDiagnosticRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    date: yup.date().required(),
    description: yup.string().required(),
    user: yup.string().required(),
    medic: yup.string().required(),
  });

export const diagnosticResponseSchema: SchemaOf<IDiagnosticResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    date: yup.date().notRequired(),
    description: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    user: yup
      .object()
      .shape({
        id: yup.string().notRequired(),
        name: yup.string().notRequired(),
        email: yup.string().notRequired(),
        phone: yup.string().notRequired(),
      })
      .notRequired(),
    medic: yup.object().shape({
      id: yup.string().notRequired(),
      name: yup.string().notRequired(),
      email: yup.string().notRequired(),
      phone: yup.string().notRequired(),
    }).notRequired(),
  });

  export const diagnosticResponseListSchema: SchemaOf<IDiagnosticListResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    date: yup.date().notRequired(),
    description: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    user: yup
      .object()
      .shape({
        id: yup.string().notRequired(),
        name: yup.string().notRequired(),
        email: yup.string().notRequired(),
        phone: yup.string().notRequired(),
      }).notRequired()
  });

  export const allUsersDiagnosticSchema: SchemaOf<IDiagnosticListResponse[]> = yup.array().of(diagnosticResponseListSchema)

