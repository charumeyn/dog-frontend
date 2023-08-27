"use client"

import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import UserHomeContent from "./user/UserHomeContent";
import ShelterDogsContent from "./shelter/ShelterDogsContent";
import { useShelter } from "@/app/hooks/api/useShelters";

export default function HomeContent() {

  const { data: account, isLoading: isLoadingAccount } = useAccount();

  return (
    account ?
      <div>{account?.type === UserType.User ? <UserHomeContent account={account} /> : <ShelterDogsContent account={account} />}</div>
      : null
  )
}
