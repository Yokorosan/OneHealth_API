export interface IMedicRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  isWhatsApp?: boolean;
  address: {
    district: string;
    zipCode: string;
    number: string;
    city: string;
    state: string;
  };
  speciality: string;
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
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMedicProfileResponse {
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
  speciality?: {
    id: string;
    name:string;
  }
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISpeciality {
  id?: string;
  name: string;
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
  speciality?: ISpeciality;
}
