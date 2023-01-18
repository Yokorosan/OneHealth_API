import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IMedicResponse,
  IMedicRequest,
  IMedicProfileResponse,
  IReturnedUserByEmail,
  IMedicUpdateCorrect,
} from "../interfaces/medics/medics.interface";

export const MedicsRequestSchema: SchemaOf<IMedicRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  isWhatsApp: yup.boolean().notRequired(),
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
  // isAdm: yup.boolean().notRequired(),
});

export const UpdateMedicSchema: SchemaOf<IMedicUpdateCorrect> = yup.object().shape({
  name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    isWhatsApp: yup.boolean().notRequired(),
    address: yup
      .object()
      .shape({
        district: yup.string().notRequired(),
        zipCode: yup.string().notRequired(),
        number: yup.string().notRequired(),
        city: yup.string().notRequired(),
        state: yup.string().notRequired(),
      }).notRequired(),
      speciality: yup.string()
      .notRequired(),
}).strict(true)
.noUnknown(true);

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
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });

export const MedicProfileWhitoutPassSchema: SchemaOf<IMedicProfileResponse> =
  yup.object().shape({
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
    speciality: yup
      .object()
      .shape({
        id: yup.string().notRequired(),
        name: yup.string().notRequired(),
      })
      .notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });

export const GetMedicsSchema: SchemaOf<IMedicProfileResponse[]> = yup
  .array()
  .of(MedicProfileWhitoutPassSchema);


export const listUserByEmailReturned: SchemaOf<IReturnedUserByEmail> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired()
})
