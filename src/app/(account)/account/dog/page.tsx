"use client"

import AccountContainer from "@/app/components/layout/AccountContainer";
import { useAccount } from "@/app/hooks/api/useAuth";

export default function AccountDogRegister({ params }: { params: any }) {

  const { data: account, isLoading: isLoadingAccount } = useAccount();

  return (
    <>
      <AccountContainer
        mainContent={
          <div className="flex">
            {JSON.stringify(account)}
            {/* <UserDonationList />
            <UserFavoriteList /> */}
          </div>
        } />
    </>
  )
}