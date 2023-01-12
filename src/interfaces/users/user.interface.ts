export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAddressRequest {
    district: string
    zipCode: string
    number: string
    city: string
    state: string
}


export interface IUserRequest {
    name: string
    email: string
    password: string
    phone: string
    isAdm?: boolean
    address?:IAddressRequest
}




export interface IUserResponse {
  id?: string
  name?: string
	email?: string
	phone?: string
	isAdm?: boolean
	isActive?: boolean
	createdAt?: Date
	updatedAt?: Date
  address?: {
    id: string;
    district: string;
    zipCode: string;
    number: string;
    city: string;
    state: string;
  };
}


