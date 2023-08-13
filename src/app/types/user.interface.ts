import { Address } from "./address.interface";
import { Shelter } from "./shelter.interface";

export interface User {
  data: any;
  id: number;
  email: string;
  password: string;
  lastLoginAt?: Date;
  firstName?: string;
  lastName?: string;
  phone?: string;
  type: UserType;
  address: Address;
  shelter: Shelter;
  comments: any[];
  donations: any[];
  fundraisers: any[];
}

export enum UserType {
  User = "user",
  Admin = "admin",
  Shelter = "shelter",
}