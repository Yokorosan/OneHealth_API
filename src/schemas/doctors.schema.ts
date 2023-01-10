import * as yup from "yup";
import { SchemaOf } from "yup";
import { IDoctor } from "../interfaces/doctors/doctors.interface";

export const doctorWhitoutPassSchema = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  isWhatsApp: yup.boolean().notRequired(),
  address: yup.object().shape({
    id: yup.string().notRequired(),
    district: yup.string().notRequired(),
    zipCode: yup.string().notRequired(),
    number: yup.string().notRequired(),
    city: yup.string().notRequired(),
    state: yup.string().notRequired(),
  }),
  specialityId: yup.string().notRequired(),
  isAdm: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});
