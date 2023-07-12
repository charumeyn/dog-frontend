import { RecipientType } from "./enum/recipientType.enum";
import { User } from "./user.interface";

export interface Fundraiser {
  id: number;
  user: User;
  title: string;
  content: string;
  images: string[];
  goal_amount: number;
  current_amount: number;
  starts_at: Date;
  ends_at: Date;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  shelter: any;
};

export interface CreateFundraiserDto {
  title: string;
  content: string;
  mainImage: string;
  images: string[];
  purpose: string;
  type: RecipientType;
  goal_amount: number;
  current_amount: number;
  starts_at: Date;
  ends_at: Date;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  created_by: number;
  shelter_id?: number;
  user_id?: number;
  dog_id?: number;
}