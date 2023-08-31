"use client"

import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import UserDonationsContent from "./user/UserDonationsContent";
import ShelterDonationsContent from "./shelter/ShelterDonationsContent";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoantionsContent() {

  const { data: account, isLoading: isLoadingAccount } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (account) {
      if (account.id === undefined) {
        router.push("/login")
      }
    }
  }, [account])

  return (
    account ?
      <div>
        {account?.type === UserType.User ? <UserDonationsContent /> : <ShelterDonationsContent account={account} />}
      </div>
      : null
  )
}

