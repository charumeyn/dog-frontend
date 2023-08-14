"use client"

import PaymentComplete from "@/app/components/layout/common/PaymentComplete";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useDog } from "@/app/hooks/api/useDogs";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { useState } from "react";

type ThankYouContentProps = {
  searchParams: DonationParams;
}

interface DonationParams {
  donationType: DonationType;
  recipientType: RecipientType;
  recipientId: number;
  id: number;
}

export const ThankYouContentDog: React.FunctionComponent<ThankYouContentProps> = ({ searchParams }) => {

  const { data: account } = useAccount();
  const { data: dog } = useDog(searchParams.recipientId)

  return (
    dog ?
      <PaymentComplete
        image={dog?.mainImage} name={dog?.name}
        type={searchParams.donationType}
        recipientId={searchParams.recipientId}
        account={account}
        donationId={searchParams.id}
      /> :
      null
  )
}

export const ThankYouContentFundraiser: React.FunctionComponent<ThankYouContentProps> = ({ searchParams }) => {

  const { data: account } = useAccount();

  const [name, setName] = useState<string>("")
  const [image, setImage] = useState<string>("")

  const { data: fundraiser } = useDog(searchParams.recipientId)

  return (
    <>
      {JSON.stringify(fundraiser)}
      <PaymentComplete
        image={image} name={name}
        type={searchParams.donationType}
        recipientId={searchParams.recipientId}
        account={account}
        donationId={searchParams.id}
      />
    </>
  )
}