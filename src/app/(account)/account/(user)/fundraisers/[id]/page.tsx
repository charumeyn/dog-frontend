import AccountContainer from "@/app/components/layout/AccountContainer";
import FundraiserEditContent from "@/app/feature/account/FundraiserEditContent";

export default function Fundraisers({ params }: { params: any }) {

  return (
    <AccountContainer
      currentPage={'fundraisers'}
      mainContent={
        <FundraiserEditContent id={Number(params.id)} />
      } />
  )
}