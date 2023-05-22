import { Shelter } from "./shelter.interface";

export interface Dog {
  id: number;
  shelterId: Shelter[];
  name: string;
  breed: number[];
  birthdate: Date;
  color: Color[];
  dogSize: DogSize;
  gender: Gender;
  coatLength: CoatLength;
  images: string[];
  description: string;
  isActive: boolean;
  createAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};