import { PaymentGateway } from "../enum/paymentGateway.enum";

export interface DonationCreateDto {
  donor_email: string;
  type: string;
  payment_gateway: PaymentGateway;
  amount: number;
  dog_id?: number;
  fundraiser_id?: number;
  status: string;
  transaction_id: number;
  created_at: Date
}