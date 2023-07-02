import { User } from "./user.interface";

export interface Address {
  id: number;
  line1: string;
  line2: string;
  line3: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  user: User;
}