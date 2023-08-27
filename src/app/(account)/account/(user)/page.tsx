import AccountContainer from "@/app/components/layout/AccountContainer";
import HomeContent from "@/app/feature/account/HomeContent";

export default function Account({ params }: { params: any }) {
  return (
    <AccountContainer
      currentPage={'home'}
      mainContent={
        <HomeContent />
      } />
  )
}