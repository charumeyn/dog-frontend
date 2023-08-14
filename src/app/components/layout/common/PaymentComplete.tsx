"use client"

import { Account } from "@/app/types/account.interface";
import { SuccessResult } from "@/app/types/apiResult";
import { DonationType } from "@/app/types/enum/donationType.enum";
import Heading from "./Heading";
import CommentTextArea from "@/app/feature/comment/CommentTextArea.client";
import { RecipientType } from "@/app/types/enum/recipientType.enum";

type PaymentCompleteProps = {
  name: string;
  image: string;
  type: DonationType;
  recipientId: number;
  account: Account;
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
            text={`${account?.data.firstName}, thank you for sponsoring ${name}!`}
            className="!text-teal-600 !text-2xl !font-bold" />
        </div>
        <div>
          <Heading
            type={"h1"}
            text={`Leave a message for  ${name}`}
            className="" />
          <CommentTextArea donationType={type} recipientType={RecipientType.Dog} />
        </div>
      </div>
    </div>
  )
}

export default PaymentComplete;