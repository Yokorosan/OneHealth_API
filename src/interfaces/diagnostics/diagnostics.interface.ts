import { IMedicResponse } from "../medics/medics.interface";
import { IUserResponse } from "../users/user.interface";

export interface IDiagnosticRequest {
  name: string;
  date: Date;
  description: string;
  user: string;
  medic: string;
}

export interface IDiagnosticResponse {
  id?: string;
  name?: string;
  date?: Date;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  medic?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface IDiagnosticListResponse {
  id?: string;
  name?: string;
  date?: Date;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
}
