import { UserType } from "./user.interface";

export interface AccountData {
  id: number;
  email: string;
  lastLogIn: string;
  firstName: string;
  lastName: string;
  phone: string;
  type: UserType;
}

export interface Account {
  success: boolean;
  data: AccountData;
}