import { Dog } from "./dog.interface";
import { Fundraiser } from "./fundraiser.interface";

export interface Shelter {
  id: number;
  name: string;
  approver_id: number;
  is_active: boolean;
  is_approved: boolean;
  image_thumb: string;
  images: string[];
  created_at: Date;
  dogs: Dog[];
  fundraisers: Fundraiser[];
  address: any;
  users: any


  profileId: number;
  approved_at?: Date | null;
  founded_date?: Date | null;
  founder_name?: string;
  email: string;
  phone: string;

}