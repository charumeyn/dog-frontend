"use client"

import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import UserHomeContent from "./user/UserHomeContent";
import ShelterDogsContent from "./shelter/ShelterDogsContent";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeContent() {

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
      <div>{account?.type === UserType.User ? <UserHomeContent account={account} /> : <ShelterDogsContent account={account} />}</div>
      : null
  )
}
