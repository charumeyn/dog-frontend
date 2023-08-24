"use client"

import AccountContainer from "@/app/components/layout/AccountContainer";
import AccountContent from "@/app/feature/account/AccountContent";
import AccountContentSkeleton from "@/app/feature/account/AccountContentSkeleton";
import HomeContent from "@/app/feature/account/HomeContent";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useDog } from "@/app/hooks/api/useDogs";

export default function Account({ params }: { params: any }) {

  const { data: account, isLoading: isLoadingAccount } = useAccount();
  const { data: dog } = useDog(24);

  return (

    <AccountContainer
      mainContent={
        <HomeContent />
      } />
  )
}