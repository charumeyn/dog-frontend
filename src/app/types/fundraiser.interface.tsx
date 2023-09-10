import { Comment } from "./comment.interface";
import { Dog } from "./dog.interface";
import { Donation } from "./donation.interface";
import { RecipientType } from "./enum/recipientType.enum";
import { Shelter } from "./shelter.interface";
import { User } from "./user.interface";

export interface Fundraiser {
  id: number;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  images: string[];
  goalAmount: number;
  donations: Donation[];
  startsAt: Date;
  endsAt: Date;
  createdByUser: User;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  dog: Dog;
  user: User;
  shelter: Shelter;
  comments: Comment[];
};

export interface CreateFundraiserDto {
  title: string;
  description: string;
  content: string;
  mainImage: string;
  images: string[];
  type: RecipientType;
  goalAmount: number;
  startsAt: Date;
  endsAt: Date;
  createdById: number;
  shelterId?: number;
  userId?: number;
  dogId?: number;
}

export interface UpdateFundraiserDto {
  id: number;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  images: string[];
  goalAmount: number;
  startsAt: Date;
  endsAt: Date;
}