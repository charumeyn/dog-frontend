"use client"

import { IconHorizontalDots } from "@/app/components/layout/Icons";
import DropdownMenu from "@/app/components/layout/common/DropdownMenu";
import Heading from "@/app/components/layout/common/Heading";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useFundraiser } from "@/app/hooks/api/useFundraisers";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import moment from "moment";
import { useCallback, useEffect, useMemo } from "react";
import FundraiserStatus from "../fundraisers/StatusLabel";
import { useRouter } from "next/navigation";
import StatusText from "../fundraisers/StatusLabel";
import StatusLabel from "../fundraisers/StatusLabel";

export default function FundraisersContent() {

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
      account.id ?
        <FundraiserList fundraisers={account.createdFundraisers} />
        : null
      : null
  )
}

function FundraiserList({ fundraisers }: { fundraisers: Fundraiser[] }) {

  const fundraiserLink = useCallback((id: number) => {
    return `/fundraisers/${id}`
  }, [])

  return (
    <div className="mt-6 lg:mt-8">
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="Fundraisers" />
        <a href="/fundraisers/create" className="text-teal-600 font-semibold text-sm">+ Create fundraiser</a>
      </div>

      <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg divide-y divide-gray-300">
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
    { label: "Edit", url: `/account/fundraisers/${id}` },
    { label: "View", url: `/fundraisers/${id}` },
  ];

  return (
    fundraiser ?
      <div className="grid grid-cols-2">
        <div className="col-span-2 md:col-span-1 p-5">
          <a href={`/fundraisers/${fundraiser.id}`} className="font-semibold hover:text-teal-600 pr-2">{fundraiser.title}</a>
          <br className="block md:hidden" /><StatusLabel startsAt={fundraiser.startsAt} endsAt={fundraiser.endsAt} />
          <p className="text-zinc-500 text-sm mt-1">Duration: {moment(fundraiser.startsAt).format("MMMM Do YYYY")} ~ {moment(fundraiser.endsAt).format("MMMM Do YYYY")}</p>
        </div>
        <div className="col-span-2 md:col-span-1 grid grid-cols-5 gap-x-8 pb-2 px-5 md:p-5">
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

