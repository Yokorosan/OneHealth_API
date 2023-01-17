export interface IDiagnosticRequest {
  name: string;
  date: Date;
  description: string;
  user: string;
  medic: string;
}

export interface IDiagnosticUpdate {
  name: string;
  date: Date;
  description: string;
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
export interface IDiagnosticOfUserResponse {
  id?: string;
  name?: string;
  date?: Date;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface IDiagnosticsByUserResponse {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  diagnostic?: IDiagnosticObjectResponse[];
}
export interface IDiagnosticObjectResponse {
  id?: string;
  name?: string;
  date?: Date;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
