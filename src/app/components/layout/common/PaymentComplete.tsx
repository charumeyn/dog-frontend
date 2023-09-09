"use client"

import { DonationType } from "@/app/types/enum/donationType.enum";
import Heading from "./Heading";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import DonationTextArea from "@/app/feature/comment/DonationTextArea.client";
import { User } from "@/app/types/user.interface";

type PaymentCompleteProps = {
  name: string;
  image: string;
  type: DonationType;
  recipientId: number;
  account?: User;
  donationId: number;
}

const PaymentComplete: React.FunctionComponent<PaymentCompleteProps> = ({ name, image, type, recipientId, account, donationId }) => {

  return (
    <div className="bg-white rounded-xl px-20 py-16">
      <div className="grid grid-cols-2 gap-x-10">
        <div>
          <img src={image} alt={name} className="w-44 h-44 rounded-full mb-10" />
          <Heading
            type={"h1"}
            text={`${account?.firstName}, thank you for sponsoring ${name}!`}
            className="!text-teal-600 !text-2xl !font-bold max-w-sm" />
        </div>
        <div>
          <Heading
            type={"h1"}
            text={`Leave a message for  ${name}`}
            className="mb-5" />
          <DonationTextArea donationType={type} recipientType={RecipientType.Dog} recipientId={recipientId} account={account} />
        </div>
      </div>
    </div>
  )
}

export default PaymentComplete;