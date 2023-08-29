
import AccountContainer from "@/app/components/layout/AccountContainer";
import AccountEditContent from "@/app/feature/account/AccountEditContent";
import DonationsContent from "@/app/feature/account/DonationsContent";

export default function Donations({ params }: { params: any }) {

  return (
    <AccountContainer
      currentPage={'edit'}
      mainContent={
        <AccountEditContent />
      }
    />
  )
}
