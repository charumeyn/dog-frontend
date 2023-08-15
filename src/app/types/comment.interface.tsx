import { Dog } from "./dog.interface";
import { CommentType } from "./enum/commentType.enum";
import { Fundraiser } from "./fundraiser.interface";
import { Post } from "./post.interface";
import { User } from "./user.interface";

export interface Comment {
  id: number;
  content: string;
  commentType: CommentType;
  post?: Post;
  dog?: Dog;
  fundraiser?: Fundraiser;
  user: User;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CreateCommentDto {
  userId: number;
  commentType: CommentType;
  postId?: number;
  dogId?: number;
  fundraiserId?: number;
  content: string;
}
