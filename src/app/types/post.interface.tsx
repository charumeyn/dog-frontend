import { Comment } from "./comment.interface";
import { Dog } from "./dog.interface";

export interface Post {
  id: number;
  content: string;
  mainImage: string;
  images: string[];
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  dog: Dog;
  comments: Comment[];
};

export interface CreatePostDto {
  dogId: number | undefined;
  content: string;
  mainImage: string;
  images: string[];
}