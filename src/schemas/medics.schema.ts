import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IMedicResponse,
  IMedicRequest,
} from "../interfaces/medics/medics.interface";

export const MedicsRequestSchema: SchemaOf<IMedicRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  isWhatsApp: yup.boolean().required(),
  isActive: yup.boolean().notRequired(),
  address: yup
    .object()
    .shape({
      district: yup.string().required(),
      zipCode: yup.string().required(),
      number: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
    })
    .required(),
  speciality: yup.string().required(),
  isAdm: yup.boolean().notRequired(),
});

export const MedicWhitoutPassSchema: SchemaOf<IMedicResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    isWhatsApp: yup.boolean().notRequired(),
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
    speciality: yup.string().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });
