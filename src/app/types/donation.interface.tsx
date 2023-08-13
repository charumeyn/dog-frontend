import { Dog } from "./dog.interface";
import { DonationType } from "./enum/donationType.enum";
import { PaymentGateway } from "./enum/paymentGateway.enum";
import { PaymentStatus } from "./enum/paymentStatus.enum";
import { RecipientType } from "./enum/recipientType.enum";
import { Fundraiser } from "./fundraiser.interface";

export interface Donation {
  id: number;
  email: string;
  transaction_id: string;
  transaction_firstname: string;
  transaction_lastname: string;
  type: DonationType;
  payment_gateway: PaymentGateway;
  status: PaymentStatus;
  amount: number;
  created_at: Date;
  dog?: Dog;
  fundraiser?: Fundraiser;
}