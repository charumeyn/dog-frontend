import { Donation } from "./donation.interface";
import { CoatLength } from "./enum/coatLength.enum";
import { Color } from "./enum/color.enum";
import { Gender } from "./enum/gender.enum";
import { Size } from "./enum/size.enum";
import { Post } from "./post.interface";
import { Shelter } from "./shelter.interface";

export interface Dog {
  id: number;
  name: string;
  breed: number[];
  birthdate: Date;
  color: Color[];
  size: Size;
  gender: Gender;
  coatLength: CoatLength;
  mainImage: string;
  images: string[];
  description: string;
  isActive: boolean;
  createdAt: Date;
  udpatedAt?: Date;
  deletedAt?: Date;
  shelter: Shelter;
  posts: Post[];
  donations: Donation[];
  comments: Comment[];
};
