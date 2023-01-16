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
  id: string;
  name: string;
  date: Date;
  description: string;
  userId?: string;
  medicId?: string;
}