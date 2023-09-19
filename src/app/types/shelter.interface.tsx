import { Address } from "./address.interface";
import { Dog } from "./dog.interface";
import { Fundraiser } from "./fundraiser.interface";
import { User } from "./user.interface";

export interface Shelter {
  id: number;
  name: string;
  description: string;
  content: string;
  mainImage: string;
  images: string[];
  approverId?: number;
  approvedAt?: Date;
  isActive?: boolean;
  isApproved?: boolean;
  createdAt: Date;
  dogs?: Dog[];
  fundraisers?: Fundraiser[];
  address: string;
  user?: User;
}

export interface CreateShelterDto {
  name: string;
  mainImage: string;
  images: string[];
  address: string;
  description: string;
  content: string;
  userId: number;
}

export interface UpdateShelterDto {
  id: number;
  name: string;
  mainImage: string;
  address: string;
  images: string[];
  description: string;
  content: string;
}