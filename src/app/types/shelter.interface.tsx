import { Dog } from "./dog.interface";
import { Fundraiser } from "./fundraiser.interface";

export interface Shelter {
  id: number;
  name: string;
  approverId: number;
  isActive: boolean;
  isApproved: boolean;
  mainImage: string;
  images: string[];
  createdAt: Date;
  dogs: Dog[];
  fundraisers: Fundraiser[];
  address: any;
  users: any
  approvedAt?: Date | null;
}