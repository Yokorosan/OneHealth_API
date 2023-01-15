import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAddressRequest } from "../interfaces/address/address.interface";

export const addressRequestSchema: SchemaOf<IAddressRequest> = yup
  .object()
  .shape({
    district: yup.string().required(),
    zipCode: yup.string().required(),
    number: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
  });
