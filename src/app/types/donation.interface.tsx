import { Dog } from "./dog.interface";
import { PaymentGateway } from "./enum/paymentGateway.enum";
import { PaymentStatus } from "./enum/paymentStatus.enum";
import { RecipientType } from "./enum/recipientType.enum";
import { Fundraiser } from "./fundraiser.interface";

export interface Donation {
  id: number;
  donor_email: string;
  type: RecipientType;
  payment_gateway: PaymentGateway;
  status: PaymentStatus;
  amount: number;
  created_at: Date;
  dog?: Dog | null;
  fundraiser?: Fundraiser | null;
}