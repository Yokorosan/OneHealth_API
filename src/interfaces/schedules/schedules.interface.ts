export interface IScheduleRequest {
  type: string;
  date: string;
  hour: string;
  user: string;
  medic: string;
}

export interface IScheduleUpdateRequest {
  type?: string;
  date?: string;
  hour?: string;
}

export interface IScheduleResponse {
  id?: string;
  type?: string;
  date?: string;
  hour?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: {
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

export interface ISchedulesOfUserResponse {
  id?: string;
  type?: string;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null | undefined;
}

export interface IScheduleListMedicResponse {
  id?: string;
  name?: string;
  appointment?: {
    id?: string;
    type?: string;
    date?: Date;
    hour?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: {
      name?: string;
      email?: string;
      phone?: string;
    };
  }[];
}
