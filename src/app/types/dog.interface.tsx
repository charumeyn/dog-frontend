import { Donation } from "./donation.interface";
import { Post } from "./post.interface";
import { Shelter } from "./shelter.interface";

export interface Dog {
  id: number;
  name: string;
  breed: number[];
  birthdate: Date;
  color: Color[];
  size: DogSize;
  gender: Gender;
  coat_length: CoatLength;
  images: string[];
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  shelter: Shelter;
  posts: Post[];
  donations: Donation[];
};
