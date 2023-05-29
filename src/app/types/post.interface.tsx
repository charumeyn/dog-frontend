import { Dog } from "./dog.interface";
import { Shelter } from "./shelter.interface";

export interface Post {
  id: number;
  title: string;
  content: string;
  thumb_image: string;
  images: string[];
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  dog: Dog;
};