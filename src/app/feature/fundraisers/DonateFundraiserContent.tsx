
"use client"

import PaymentContent from "@/app/components/layout/common/PaymentContent";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useFundraiser } from "@/app/hooks/api/useFundraisers";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { useMemo } from "react";


type DonateFundraiserContentProps = {
  fundraiserId: number;
}

const SponsorDogContent: React.FunctionComponent<DonateFundraiserContentProps> = ({ fundraiserId }) => {
  const { data: fundraiser, isLoading: isLoadingFundraiser } = useFundraiser(fundraiserId);
  const { data: account, isLoading: isLoadingAccount } = useAccount();

  const recipientId = useMemo(() => {
    if (fundraiser?.dog != null) {
      return fundraiser?.dog.id
    } else if (fundraiser?.shelter != null) {
      return fundraiser?.shelter.id
    } else {
      return fundraiser?.user.id
    }
  }, [fundraiser])


  return (
    fundraiser ?
      <PaymentContent
        image={fundraiser.mainImage}
        name={fundraiser.title}
        type={DonationType.Fundraiser}
        fundraiserId={fundraiserId}
        recipientId={recipientId}
        account={account} />
      : null
  )
}

export default SponsorDogContent;