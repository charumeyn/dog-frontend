import AccountContainer from "@/app/components/layout/AccountContainer";
import FundraiserEditContent from "@/app/feature/account/FundraiserEditContent";

export default function Fundraisers({ params }: { params: any }) {

  return (
    <>{JSON.stringify(params)}
      <AccountContainer
        mainContent={
          <FundraiserEditContent id={Number(params.id)} />
        } />
    </>
  )
}