"use client"
import { Badge } from "@/app/components/layout/common/Badge"
import DashboardStats from "@/app/components/layout/common/DashboardStats"
import Heading from "@/app/components/layout/common/Heading"
import { TableCell } from "@/app/components/layout/common/Table"
import { useAccount } from "@/app/hooks/api/useAuth"
import { useDonation } from "@/app/hooks/api/useDonations"
import { Donation } from "@/app/types/donation.interface"
import { DonationType } from "@/app/types/enum/donationType.enum"
import moment from "moment"
import { useMemo } from "react"
import { FavoritesRow } from "./UserHomeContent"

export default function UserDonationsContent() {

  const { data: account } = useAccount();

  return (
    account ?
      <div className="mx-auto flex w-full items-start gap-x-8">
        <main className="flex-1">
          <UserStats />
          <UserDonationList donations={account?.donations} />
        </main>
        <aside className="hidden w-60	shrink-0 lg:block">
          <UserFavoriteList dogIds={account.favoriteDogIds} />
        </aside>
      </div> : null
  )
}

function UserStats() {

  const stats = [
    { label: 'Sponsored', value: '1 dog' },
    { label: 'Donated to', value: '5 fundraisers' },
  ]

  return (
    <div>
      <Heading type="h1" text="My Donations" className="mb-4" />

      <DashboardStats stats={stats} />
    </div>
  )
}

function UserDonationList({ donations }: { donations: Donation[] }) {

  return (
    <div className="mt-6 lg:mt-8">
      <Heading type="h2" text="My Donations" className="mb-4" />

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <TableCell children={"Date"} isFirst={true} isHeader={true} />
              <TableCell children={"Type"} isHeader={true} />
              <TableCell children={"Recepient"} isHeader={true} />
              <TableCell children={"Amount"} isHeader={true} />
              <TableCell children={""} isLast={true} isHeader={true} />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            {donations.map((donation, i) => (
              <UserDonationRow key={i} id={donation.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UserDonationRow({ id }: { id: number }) {

  const { data: donation } = useDonation(id)

  const recepient = useMemo(() => {
    if (donation?.dog != undefined) {
      return donation?.dog.name
    } else if (donation?.user != undefined) {
      return donation?.user.firstName
    } else if (donation?.shelter != undefined) {
      return donation.shelter.name
    }
  }, [donation])

  const recepientId = useMemo(() => {
    if (donation?.dog != undefined) {
      return donation?.dog.id
    } else if (donation?.user != undefined) {
      return donation?.user.id
    } else if (donation?.shelter != undefined) {
      return donation.shelter.id
    }
  }, [donation])

  const url = useMemo(() => {
    if (donation?.donationType === DonationType.Dog) {
      return `/dogs/${recepientId} `
    } else {
      return `/fundraisers/${recepientId} `
    }
  }, [donation])

  return (
    donation ?
      <tr>
        <TableCell children={moment(donation.createdAt).format("YYYY-MM-DD")} isFirst={true} />
        <TableCell children={
          donation.donationType === DonationType.Dog ? <Badge color={"orange"} children={"Sponsor"} /> : <Badge color={"blue"} children={"Fundraiser"} />
        } />
        <TableCell children={recepient} />
        <TableCell children={`$${donation.amount}`} />
        <TableCell children={
          <a href={url} className="text-indigo-600 hover:text-indigo-900">
            Visit
          </a>
        } isLast={true} />
      </tr> : null
  )
}

function UserFavoriteList({ dogIds }: { dogIds: number[] }) {

  return (
    <div>
      <Heading type={"h2"} text={"My Favorite Dogs"} className="!text-zinc-500 mb-5" />
      {dogIds.length > 0 ?
        dogIds.map((id, i) => (
          <FavoritesRow key={i} id={Number(id)} />
        )) : <div className="text-zinc-600">No favorite dogs yet.</div>}
    </div>
  )
}