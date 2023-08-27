"use client"

import DogCard from "@/app/components/layout/common/DogCard";
import Heading from "@/app/components/layout/common/Heading";
import { useAccount } from "@/app/hooks/api/useAuth";
import { Dog } from "@/app/types/dog.interface";

export default function DogsContent() {

  const { data: account, isLoading: isLoadingAccount } = useAccount();

  return (
    account ?
      <div className="mt-8">
        <Heading type="h1" text="My Dogs" className="mb-4" />

        <DogsList dogs={account.dogs} />
      </div> : null
  )
}

function DogsList({ dogs }: { dogs: Dog[] }) {

  return (
    <div className="grid grid-cols-4 gap-x-8">
      {dogs?.map((dog: Dog, i: number) =>
        <DogCard key={i} dog={dog} />
      )}
    </div>
  )
}
