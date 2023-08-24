"use client"

import ButtonLink from "@/app/components/layout/common/ButtonLink";
import Heading from "@/app/components/layout/common/Heading";
import StackedAvatars from "@/app/components/layout/common/StackedAvatars";
import { TableCell } from "@/app/components/layout/common/Table";
import { useAccount } from "@/app/hooks/api/useAuth";
import moment from "moment";

export default function FundraisersContent() {

  const { data: account, isLoading: isLoadingAccount } = useAccount();

  return (
    <FundraiserList />
  )
}

function FundraiserList() {

  const fundraisers = [
    { id: 30, title: 'Peanut Butter needs a leg surgery', startsAt: '2023.08.10', endsAt: '2023.08.20', goalAmount: '$100.00', currentAmount: '$25.00', donorCount: 12, url: '#' },
    { id: 29, title: 'Rocky needs a surgery', startsAt: '2023.08.10', endsAt: '2023.08.31', goalAmount: '$200.00', currentAmount: '$35.00', donorCount: 12, url: '#' },
  ]

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="My Fundraisers" />
        <a href="#" className="text-teal-600 font-semibold text-sm">+ Create fundraiser</a>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg divide-y divide-gray-300">
        {fundraisers.map((fundraiser, i) => (
          <div key={i} className="grid grid-cols-2">
            <div className="col-span-1 p-5">
              <p className="font-semibold">{fundraiser.title}</p>
              <p className="text-zinc-500 text-sm">Duration: {moment(fundraiser.startsAt).format("YYYY-MM-DD")} ~ {moment(fundraiser.endsAt).format("YYYY-MM-DD")}</p>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-x-8 p-5">
              <div>
                <span className="font-semibold">{fundraiser.currentAmount}</span> <span className="text-zinc-200">/</span> {fundraiser.goalAmount}
              </div>
              <div>
                12 donors
              </div>
              <div>
                ...
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
