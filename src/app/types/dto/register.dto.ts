import { UserType } from "../user.interface";

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: UserType;
}