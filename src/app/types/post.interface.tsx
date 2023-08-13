import { Dog } from "./dog.interface";
import { Shelter } from "./shelter.interface";

export interface Post {
  id: number;
  title: string;
  content: string;
  mainImage: string;
  images: string[];
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  dog: Dog;
};