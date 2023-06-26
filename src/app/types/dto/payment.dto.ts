import { PaymentGateway } from "../enum/paymentGateway.enum";
import { RecipientType } from "../enum/recipientType.enum";

export interface DonationCreateDto {
  transaction_id: number;
  email: string;
  payment_gateway: PaymentGateway;
  type: RecipientType;
  status: string;
  amount: number;
  dog_id?: number;
  fundraiser_id?: number;
  user_id?: number;
  transaction_firstname: string,
  transaction_lastname: string,
  created_at: Date
}