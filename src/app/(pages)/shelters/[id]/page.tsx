"use client"

import DogCard from "@/app/components/layout/common/DogCard";
import FundraiserCard from "@/app/components/layout/common/FundraiserCard";
import FundraiserInfo from "@/app/feature/fundraisers/FundraiserInfo";
import { useFundraiser, useFundraisers } from "@/app/hooks/api/useFundraisers";
import { useShelter, useShelters } from "@/app/hooks/api/useShelters";
import { Dog } from "@/app/types/dog.interface";

export default function Shelter({ params }: { params: any }) {

  const id = Number(params.id);

  const { data: shelter, isLoading: isLoadingShelter } = useShelter(id);

  return (
    <main>
      <section className="py-16">
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-x-6 mb-5">
            <img src={shelter?.image_thumb} className="w-20 h-20 rounded-full" />
            <div>
              <h3 className="font-bold">{shelter?.name}</h3>
              <p className="text-gray-500 text-sm">{shelter?.email} - {shelter?.phone}</p>
            </div>
          </div>
          <div className="border border-gray-100 px-5 py-5 rounded-lg">
            insert description
          </div>
          <div>
            insert address
          </div>
          <div>
            insert google map
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <h2 className="mb-5 font-bold text-lg text-center">Dogs from {shelter?.name}</h2>
          <div className="w-full max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-4 gap-x-8">
              {shelter?.dogs.map((dog: Dog, i: number) =>
                <DogCard key={i} dog={dog} />
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}