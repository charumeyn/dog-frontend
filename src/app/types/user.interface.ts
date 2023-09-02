import { Address } from "./address.interface";
import { Comment } from "./comment.interface";
import { Dog } from "./dog.interface";
import { Donation } from "./donation.interface";
import { Fundraiser } from "./fundraiser.interface";
import { Shelter } from "./shelter.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  lastLoginAt?: Date;
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: string;
  type: UserType;
  address: Address;
  shelter: Shelter;
  comments: Comment[]
  donations: Donation[];
  fundraisers: Fundraiser[];
  createdFundraisers: Fundraiser[];
  dogs: Dog[];
  favoriteDogIds: number[];
}

export enum UserType {
  User = "user",
  Admin = "admin",
  Shelter = "shelter",
}

export interface UpdateUserDto {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

export interface UpdateFavoritesDto {
  id: number;
  favoriteDogIds: number[];
}