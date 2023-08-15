import { CommentType } from "./enum/commentType.enum";

export interface Comment {

}

export interface CreateCommentDto {
  userId: number;
  commentType: CommentType;
  postId?: number;
  dogId?: number;
  fundraiserId?: number;
  content: string;
}
