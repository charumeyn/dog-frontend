
import AccountContainer from "@/app/components/layout/AccountContainer";
import DogsContent from "@/app/feature/account/DogsContent";

export default function Donations({ params }: { params: any }) {

  return (
    <AccountContainer
      currentPage={'dogs'}
      mainContent={
        <DogsContent />
      } />
  )
}
