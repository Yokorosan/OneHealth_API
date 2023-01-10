export interface IDoctorRequest {
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
  specialityId: string;
  isAdm?: boolean;
}

export interface IDoctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  isWhatsApp: boolean;
  address: {
    id: string;
    district: string;
    zipCode: string;
    number: string;
    city: string;
    state: string;
  };
  specialityId: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
