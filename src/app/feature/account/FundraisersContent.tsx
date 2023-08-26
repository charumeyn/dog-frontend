"use client"

import { IconHorizontalDots } from "@/app/components/layout/Icons";
import DropdownMenu from "@/app/components/layout/common/DropdownMenu";
import Heading from "@/app/components/layout/common/Heading";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useFundraiser } from "@/app/hooks/api/useFundraisers";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import moment from "moment";
import { useCallback, useMemo } from "react";

export default function FundraisersContent() {

  const { data: account, isLoading: isLoadingAccount } = useAccount();

  return (
    account ?
      <FundraiserList fundraisers={account.createdFundraisers} /> : null
  )
}

function FundraiserList({ fundraisers }: { fundraisers: Fundraiser[] }) {

  const fundraiserLink = useCallback((id: number) => {
    return `/fundraisers/${id}`
  }, [])

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="My Fundraisers" />
        <a href="#" className="text-teal-600 font-semibold text-sm">+ Create fundraiser</a>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg divide-y divide-gray-300">
        {fundraisers.map((fundraiser, i) => (
          <FundraiserItem key={i} id={fundraiser.id} />
        ))}
      </div>
    </div>
  )
}

function FundraiserItem({ id }: { id: number }) {

  const { data: fundraiser } = useFundraiser(id)

  const donationCount = useMemo(() => {
    if (fundraiser) {
      if (fundraiser?.donations.length > 0) {
        return `${fundraiser?.donations.length} donors`
      } else {
        return `No donors`
      }
    }
  }, [fundraiser])

  const currentAmount = useMemo(() => {
    if (fundraiser && fundraiser?.donations.length > 0) {
      return fundraiser?.donations.reduce((total, x) => total + x.amount, 0);
    } else return 0
  }, [fundraiser])

  const menuForPending = [
    { label: "Edit", url: "/edit" },
    { label: "View", url: "/fundraisers/" + fundraiser?.id },
  ];

  return (
    fundraiser ?
      <div className="grid grid-cols-2">
        <div className="col-span-1 p-5">
          <a href={`/fundraisers/${fundraiser.id}`} className="font-semibold hover:text-teal-600">{fundraiser.title}</a>
          <p className="text-zinc-500 text-sm">Duration: {moment(fundraiser.startsAt).format("YYYY-MM-DD")} ~ {moment(fundraiser.endsAt).format("YYYY-MM-DD")}</p>
        </div>
        <div className="grid grid-cols-5 gap-x-8 p-5">
          <div className="col-span-2">
            <span className="font-semibold">${currentAmount}</span> <span className="text-zinc-200">/</span> ${fundraiser.goalAmount}
          </div>
          <div className="col-span-2">
            {donationCount}
          </div>
          <div className="col-span-1 text-right">
            <DropdownMenu
              menuItems={menuForPending}
              icon={
                <IconHorizontalDots
                  className="h-8 w-8 bg-gray-200 p-1.5 rounded-full"
                  aria-hidden="true"
                />
              }
            />
          </div>
        </div>
      </div> : null
  )
}

