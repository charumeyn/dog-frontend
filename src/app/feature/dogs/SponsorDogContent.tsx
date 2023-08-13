
"use client"

import PaymentContent from "@/app/components/layout/common/PaymentContent";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useDog } from "@/app/hooks/api/useDogs";
import { DonationType } from "@/app/types/enum/donationType.enum";


type SponsorDogContentProps = {
  dogId: number;
}

const SponsorDogContent: React.FunctionComponent<SponsorDogContentProps> = ({ dogId }) => {
  const { data: dog, isLoading: isLoadingDog } = useDog(dogId);
  const { data: account, isLoading: isLoadingAccount } = useAccount();


  return (
    dog ?
      <PaymentContent image={dog.mainImage} name={dog.name} type={DonationType.Dog} recipientId={dog.id} account={account} /> :
      null
  )
}

export default SponsorDogContent;