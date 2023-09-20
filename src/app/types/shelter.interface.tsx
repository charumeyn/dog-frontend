import { Dog } from "./dog.interface";
import { Fundraiser } from "./fundraiser.interface";
import { User } from "./user.interface";

export interface Shelter {
  id: number;
  name: string;
  description: string;
  content: string;
  address: string;
  phone: string;
  mainImage: string;
  images: string[];
  isApproved?: boolean;
  createdAt: Date;
  dogs?: Dog[];
  fundraisers?: Fundraiser[];
  user?: User;
}

export interface CreateShelterDto {
  name: string;
  mainImage: string;
  images: string[];
  address: string;
  phone: string;
  description: string;
  content: string;
  userId: number;
}

export interface UpdateShelterDto {
  id: number;
  name: string;
  mainImage: string;
  images: string[];
  address: string;
  phone: string;
  description: string;
  content: string;
}