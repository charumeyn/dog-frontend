import AccountContainer from "@/app/components/layout/AccountContainer";
import FundraisersContent from "@/app/feature/account/FundraisersContent";

export default function Fundraisers({ params }: { params: any }) {

  return (
    <>
      <AccountContainer
        mainContent={
          <FundraisersContent />
        } />
    </>
  )
}