"use client"

import FundraiserCard from "@/app/components/layout/common/FundraiserCard";
import FundraiserInfo from "@/app/feature/fundraisers/FundraiserInfo";
import { useFundraiser, useFundraisers } from "@/app/hooks/api/useFundraisers";
import { Fundraiser } from "@/app/types/fundraiser.interface";


export default function Fundraiser({ params }: { params: any }) {

  const id = Number(params.id);

  const { data: fundraiser, isLoading: isLoadingFundraiser } = useFundraiser(id);
  const { data: fundraisers, isLoading: isLoadingFundraisers } = useFundraisers(4);

  return (
    <main>
      <section className="py-16 bg-zinc-100">
        <div className="w-full max-w-screen-2xl mx-auto px-4 grid grid-cols-5 gap-x-16">
          <div className="col-span-3">
            <img className="aspect-[16/9] object-cover rounded-lg"
              src={fundraiser?.images[0]} alt={fundraiser?.title} />
          </div>
          <div className="col-span-2 bg-white rounded-lg py-10 px-10 shadow-lg">
            <FundraiserInfo fundraiser={fundraiser} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="max-w-4xl">
            <p className="mb-2 text-zinc-500 text-sm">Created by</p>
            <div className="border border-zinc-100 rounded-lg px-5 py-5 mb-8">
              <p className="text-sm">{fundraiser?.content}</p>
            </div>
            <p className="font-medium mb-2">Initiated by</p>
            <div className="flex items-center justify-between pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-x-6">
                <img src="" className="w-20 h-20 rounded-full" />
                <div>
                  {/* <h3 className="font-bold">{fundraiser?.shelter.name}</h3> */}
                  <p className="text-zinc-500 text-sm">insert description</p>
                </div>
              </div>
              <div>
                <a href={""} className="font-medium px-8 py-3 border border-zinc-300 rounded-full">Visit ➞</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="mb-5 font-medium">Comments from the donors</h2>
            <div className="flex gap-x-5">
              <img src="https://images.pexels.com/photos/3104709/pexels-photo-3104709.jpeg" className="w-16 h-16 rounded-full" />
              <div>
                <p className="font-bold">Charmaine Candava</p>
                <p className="text-zinc-500 text-sm mb-3">$100 • 1 hr ago</p>
                <p className="text-zinc-800 text-sm">Such a cute pup! I hope he's doing well.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-100">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <h2 className="mb-5 font-bold text-lg text-center">Help other fundraising projects</h2>
          <div className="w-full max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-4 gap-x-8">
              {isLoadingFundraisers ?
                "LOADING" :
                fundraisers?.map((fundraiser: Fundraiser, i: number) =>
                  <FundraiserCard key={i} fundraiser={fundraiser} />
                )}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}