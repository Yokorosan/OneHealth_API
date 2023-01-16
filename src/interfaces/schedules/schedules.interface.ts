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
  id?: string
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
