"use client"

import PaymentComplete from "@/app/components/layout/common/PaymentComplete";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useDog } from "@/app/hooks/api/useDogs";
import { useFundraiser } from "@/app/hooks/api/useFundraisers";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { useState } from "react";

export const ThankYouContentDog = ({ searchParams }: { searchParams: any }) => {

  const { data: account } = useAccount();
  const { data: dog } = useDog(searchParams.recipientId)

  return (
    dog ?
      <PaymentComplete
        image={dog?.mainImage} name={dog?.name}
        donationType={searchParams.donationType}
        recipientId={searchParams.recipientId}
        account={account}
        donationId={searchParams.id}
        recipientType={searchParams.recipientType}
      /> :
      null
  )
}

export const ThankYouContentFundraiser = ({ searchParams }: { searchParams: any }) => {

  const { data: account } = useAccount();
  const { data: fundraiser } = useFundraiser(searchParams.fundraiserId)

  return (
    fundraiser ?
      <PaymentComplete
        image={fundraiser.mainImage}
        name={fundraiser.title}
        donationType={searchParams.donationType}
        recipientType={searchParams.recipientType}
        recipientId={searchParams.recipientId}
        account={account}
        donationId={searchParams.id}
        fundraiserId={searchParams.fundraiserId}
      /> :
      null
  )
}