import { Comment } from "./comment.interface";
import { Dog } from "./dog.interface";

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
  comments: Comment[];
};