export interface IScheduleRequest {
  type: string;
  date: string;
  hour: string;
  user: string;
  medic: string;
}

export interface IScheduleResponse {
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
