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
  creator_id: any;
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
  shelter_id?: number;
  user_id?: number;
  dog_id?: number;
}