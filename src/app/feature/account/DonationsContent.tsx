"use client"

import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import UserDonationsContent from "./user/UserDonationsContent";
import ShelterDonationsContent from "./shelter/ShelterDonationsContent";


export default function DoantionsContent() {

  const { data: account, isLoading: isLoadingAccount } = useAccount();
  console.log("account type", account?.type)

  return (account ?
    <div>
      {account?.type === UserType.User ? <UserDonationsContent /> : <ShelterDonationsContent account={account} />}
    </div> : null
  )
}

