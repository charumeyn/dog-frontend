"use client"

import AccountContent from "@/app/feature/account/AccountContent";
import AccountContentSkeleton from "@/app/feature/account/AccountContentSkeleton";
import { useAccount } from "@/app/hooks/api/useAuth";

export default function Account({ params }: { params: any }) {

  const { data: account, isLoading: isLoadingAccount } = useAccount();

  return (
    // isLoadingAccount ?
    //   <AccountContentSkeleton /> :
    //   <AccountContent account={account?.data} />
    <div>{JSON.stringify(account)}</div>
  )
}