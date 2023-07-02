import { Address } from "./address.interface";
import { Shelter } from "./shelter.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  last_login_at: Date | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  type: UserType;
  address: Address;
  shelter: Shelter;
  comments: any[];
  donations: any[];
  fundraisers: any[];
}

export enum UserType {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}