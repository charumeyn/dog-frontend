import { Dog } from "./dog.interface";
import { DonationType } from "./enum/donationType.enum";
import { PaymentGateway } from "./enum/paymentGateway.enum";
import { PaymentStatus } from "./enum/paymentStatus.enum";
import { Fundraiser } from "./fundraiser.interface";
import { Shelter } from "./shelter.interface";
import { User } from "./user.interface";

export interface Donation {
  id: number;
  email: string;
  transactionId: string;
  transactionFirstName: string;
  transactionLastName: string;
  type: DonationType;
  paymentGateway: PaymentGateway;
  status: PaymentStatus;
  amount: number;
  createdAt: Date;
  dog?: Dog;
  shelter?: Shelter;
  user?: User;
  fundraiser?: Fundraiser;
}