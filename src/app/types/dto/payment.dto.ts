import { NumberLiteralType } from "typescript";
import { DonationType } from "../enum/donationType.enum";
import { PaymentGateway } from "../enum/paymentGateway.enum";
import { RecipientType } from "../enum/recipientType.enum";

export interface DonationCreateDto {
  transactionId: string;
  transactionFirstName: string;
  transactionLastName: string,
  email: string;
  recipientType: RecipientType;
  donationType: DonationType;
  paymentGateway: PaymentGateway;
  status: string;
  amount: number;
  dogId?: number;
  shelterId?: number;
  userId?: number;
  fundraiserId?: number;
  donorId?: number;
}