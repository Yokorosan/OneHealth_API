export interface IMedicRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  isWhatsApp: boolean;
  address: {
    district: string;
    zipCode: string;
    number: string;
    city: string;
    state: string;
  };
  speciality: string;
  isAdm?: boolean;
}

export interface IMedicResponse {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  isWhatsApp?: boolean;
  address?: {
    id: string;
    district: string;
    zipCode: string;
    number: string;
    city: string;
    state: string;
  };
  speciality?: string;
  isAdm?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IMedicUpdate {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  isWhatsApp?: boolean;
  address?: {
    district?: string;
    zipCode?: string;
    number?: string;
    city?: string;
    state?: string;
  };
  speciality?: string;
}
