import { Comment } from "./comment.interface";
import { Donation } from "./donation.interface";
import { CoatLength } from "./enum/coatLength.enum";
import { Color } from "./enum/color.enum";
import { Gender } from "./enum/gender.enum";
import { Size } from "./enum/size.enum";
import { Post } from "./post.interface";
import { Shelter } from "./shelter.interface";
import { User } from "./user.interface";

export interface Dog {
  id: number;
  name: string;
  breed: string[];
  birthdate: Date;
  color: Color[];
  size: Size;
  gender: Gender;
  coatLength: CoatLength;
  mainImage: string;
  images: string[];
  description: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
  udpatedAt?: Date;
  deletedAt?: Date;
  shelter: Shelter;
  user: User;
  posts: Post[];
  donations: Donation[];
  comments: Comment[]
};

export interface CreateDogDto {
  name: string;
  breed: string[];
  birthdate: Date;
  color: Color[];
  size: Size;
  gender: Gender;
  coatLength: CoatLength;
  mainImage: string;
  images: string[];
  description: string;
  content: string;
  shelterId?: number;
  userId?: number;
}

export interface UpdateDogDto {
  id: number;
  name: string;
  birthdate: Date;
  size: Size;
  gender: Gender;
  coatLength: CoatLength;
  mainImage: string;
  images: string[];
  description: string;
  content: string;
}