import * as yup from "yup";
import { SchemaOf } from "yup";
import { IDiagnosticRequest } from "../interfaces/diagnostics/diagnostics.interface";

export const diagnosticRequestSchema: SchemaOf<IDiagnosticRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    date: yup.date().required(),
    description: yup.string().required(),
    user: yup.string().required(),
    medic: yup.string().required()
  });
