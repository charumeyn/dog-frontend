import { Dog } from "./dog.interface";
import { RecipientType } from "./enum/recipientType.enum";
import { User } from "./user.interface";

export interface Fundraiser {
  id: number;
  title: string;
  content: string;
  main_image: string;
  images: string[];
  purpose: string;
  goal_amount: number;
  current_amount: number;
  starts_at: Date;
  ends_at: Date;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  dog: Dog;
  user: User;
  shelter: any;
};

export interface CreateFundraiserDto {
  title: string;
  content: string;
  main_image: string;
  images: string[];
  purpose: string;
  type: RecipientType;
  goal_amount: number;
  starts_at: Date;
  ends_at: Date;
  created_at: Date;
  created_by: number;
  shelter_id?: number;
  user_id?: number;
  dog_id?: number;
}