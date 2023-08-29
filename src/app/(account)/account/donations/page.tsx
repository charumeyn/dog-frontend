
import AccountContainer from "@/app/components/layout/AccountContainer";
import DonationsContent from "@/app/feature/account/DonationsContent";

export default function Donations({ params }: { params: any }) {

  return (
    <AccountContainer
      currentPage={'donations'}
      mainContent={
        <DonationsContent />
      }
    />
  )
}
