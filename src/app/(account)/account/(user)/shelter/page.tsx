import AccountContainer from "@/app/components/layout/AccountContainer";
import FundraiserEditContent from "@/app/feature/account/FundraiserEditContent";
import ShelterEditContent from "@/app/feature/account/shelter/ShelterEditContent";

export default function Shelter({ params }: { params: any }) {

  return (
    <AccountContainer
      currentPage={'shelter'}
      mainContent={
        <ShelterEditContent id={Number(params.id)} />
      } />
  )
}