import { IAddress } from '../interfaces/adress.interfaces';


export interface IUserRegistrationData {
  name: string;
  email: string;
  phoneNumber: string; 
  address: IAddress;   
}

export interface IUserCreate{
    name: string;
    email: string;
    phone: string;
}