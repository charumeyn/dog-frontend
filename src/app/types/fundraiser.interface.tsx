import { Dog } from "./dog.interface";
import { Donation } from "./donation.interface";
import { RecipientType } from "./enum/recipientType.enum";
import { User } from "./user.interface";

export interface Fundraiser {
  id: number;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  images: string[];
  purpose: string;
  goalAmount: number;
  currentAmount: number;
  donations: Donation[];
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  dog: Dog;
  user: User;
  shelter: any;
};

export interface CreateFundraiserDto {
  title: string;
  description: string;
  content: string;
  mainImage: string;
  images: string[];
  purpose: string;
  type: RecipientType;
  goalAmount: number;
  startsAt: Date;
  endsAt: Date;
  createdBy: number;
  shelterId?: number;
  userId?: number;
  dogId?: number;
}