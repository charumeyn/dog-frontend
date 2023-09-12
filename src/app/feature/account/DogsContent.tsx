"use client"

import DogCard from "@/app/components/layout/common/DogCard";
import Heading from "@/app/components/layout/common/Heading";
import { useAccount } from "@/app/hooks/api/useAuth";
import { Dog } from "@/app/types/dog.interface";
import { UserType } from "@/app/types/user.interface";
import ShelterDogsContent from "./shelter/ShelterDogsContent";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconChevronRight } from "@/app/components/layout/Icons";

export default function DogsContent() {

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
    account && account.id != undefined ?
      <div>
        {account.type === UserType.User ?
          <div>
            <Heading type="h1" text="My Dogs" className="mb-4" />
            <DogsList dogs={account.dogs} />
          </div> :
          <ShelterDogsContent account={account} />
        }
      </div> : null
  )
}

function DogsList({ dogs }: { dogs: Dog[] }) {

  return (
    dogs.length > 0 ?
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {dogs?.map((dog: Dog, i: number) =>
          <DogCard key={i} dog={dog} />
        )}
      </div>
      :
      <div>
        <p className="mb-5 mt-5">No dogs registered yet. <br />
          You can start a fundraiser for your dog when you create your dog's profile.</p>
        <a href={`/account/dogs/register`} className="text-teal-600 font-semibold">+ Register my dog</a>
      </div>
  )
}
