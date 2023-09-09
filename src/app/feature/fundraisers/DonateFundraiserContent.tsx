"use client"

import PaymentContent from "@/app/components/layout/common/PaymentContent";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useFundraiser } from "@/app/hooks/api/useFundraisers";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { useEffect, useMemo } from "react";


function SponsorDogContent({ fundraiserId, recipientId }: { fundraiserId: number, recipientId: number }) {
  const { data: fundraiser, isLoading: isLoadingFundraiser } = useFundraiser(fundraiserId);
  const { data: account, isLoading: isLoadingAccount } = useAccount();

  // const recipientId = useMemo(() => {
  //   if (fundraiser?.dog != null) {
  //     return fundraiser?.dog.id
  //   } else if (fundraiser?.shelter != null) {
  //     return fundraiser?.shelter.id
  //   } else if (fundraiser?.user != null) {
  //     return fundraiser?.user.id
  //   }
  // }, [fundraiser])

  const recipientType = useMemo(() => {
    if (fundraiser?.dog != null) {
      return RecipientType.Dog
    } else if (fundraiser?.shelter != null) {
      return RecipientType.Shelter
    } else if (fundraiser?.user != null) {
      return RecipientType.User
    } else {
      return RecipientType.Dog
    }
  }, [fundraiser])

  // useEffect(() => {
  //   console.log("searchParams", "searchParams", searchParams)
  // }, [])

  return (
    fundraiser ?
      <PaymentContent
        image={fundraiser.mainImage}
        name={fundraiser.title}
        fundraiserId={fundraiserId}
        donationType={DonationType.Fundraiser}
        recipientType={recipientType}
        recipientId={recipientId}
        account={account} />
      : null
  )
}

export default SponsorDogContent;