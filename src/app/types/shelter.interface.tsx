export interface Shelter {
  id: number;
  addressId: number;
  profileId: number;
  fundRaiserId: number;
  approverId: number;
  name: string;
  isActive: boolean;
  isApproved: boolean;
  approvedAt?: Date | null;
  foundedDate?: Date | null;
  founderName?: string;
  imageThumb: string;
  images: string[];
  email: string;
  phone: string;
  createdAt: Date;
}