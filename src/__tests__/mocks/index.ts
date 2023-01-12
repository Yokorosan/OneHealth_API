import { IAddressRequest } from "../../interfaces/users/user.interface";

export const mockedUserAdmin = {
  name: "Mikhail",
  email: "mikhail@kenzie.com.br",
  password: "123eE&456",
  phone: "(19)99999-0000",
  isAdm: true,
};

export const mockedUser = {
  name: "Astolfo",
  email: "astolfo@kenzie.com.br",
  password: "123eE&456",
  phone: "(19)99999-0000",
};

export const mockedDeletedUser = {
  name: "Yokoro",
  email: "yokoro@kenzie.com.br",
  password: "123eE&456",
  phone: "(18)99999-9999",
};

export const mockedMedic = {
  name: "Berrylium",
  email: "berryl@kenzie.com.br",
  password: "123t&R456",
  phone: "(18)88888-7777",
  speciality: "Clinico Geral",
  address: {
    district: "Rua Gavião Pomba",
    zipCode: "10.1010-101",
    number: "123",
    city: "Campinas",
    state: "SP",
  },
};

export const mockedMedicNoWhats = {
  name: "Cardinal",
  email: "card@kenzie.com.br",
  password: "123t&R456",
  phone: "(18)88888-7777",
  speciality: "Oftalmologista",
  isWhatsApp: false,
  address: {
    district: "Rua Gavião Pomba Redux",
    zipCode: "10.1010-102",
    number: "126",
    city: "Campinas",
    state: "SP",
  },
};

export const mockedUserLogin = {
  email: "astolfo@kenzie.com.br",
  password: "123eE&456",
};

export const mockedUserAdminLogin = {
  email: "mikhail@kenzie.com.br",
  password: "123eE&456",
};

export const mockedDeletedUserLogin = {
  email: "yokoro@kenzie.com.br",
  password: "123eE&456",
};

export const mockedAddressRequest: IAddressRequest = {
  district: "Rua Bartolomeu Rodriguês",
  zipCode: "05818032",
  number: "1250",
  city: "São Paulo",
  state: "SP",
};
