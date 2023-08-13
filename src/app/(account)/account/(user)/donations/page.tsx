"use client"

import AccountContainer from "@/app/components/layout/AccountContainer";
import { Badge } from "@/app/components/layout/common/Badge";
import DashboardStats from "@/app/components/layout/common/DashboardStats";
import Heading from "@/app/components/layout/common/Heading";
import { TableCell } from "@/app/components/layout/common/Table";
import { useAccount } from "@/app/hooks/api/useAuth";
import { DonationType } from "@/app/types/enum/donationType.enum";

export default function AccountDogRegister({ params }: { params: any }) {

  const { data: account, isLoading: isLoadingAccount } = useAccount();

  return (
    <>
      <AccountContainer
        mainContent={
          <div className="flex gap-x-8">
            <div className="flex-auto max-w-2xl">
              <UserStats />
              <UserDonationList />
            </div>
            <div className="flex-auto w-10">
              <UserFavoriteList />
            </div>
          </div>
        } />
    </>
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

function UserDonationList() {

  const donation = [
    { date: '2023.08.10', type: DonationType.Dog, recepient: 'Rocky', amount: '$10.00', url: '#' },
    { date: '2023.08.10', type: DonationType.Fundraiser, recepient: 'Peanut Butter', amount: '$25.00', url: '#' },
  ]

  return (
    <div className="mt-8">
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
            {donation.map((donation, i) => (
              <tr key={i}>
                <TableCell children={donation.date} isFirst={true} />
                <TableCell children={
                  donation.type === DonationType.Dog ? <Badge color={"orange"} children={"Sponsor"} /> : <Badge color={"blue"} children={"Fundraiser"} />
                } />
                <TableCell children={donation.recepient} />
                <TableCell children={donation.amount} />
                <TableCell children={
                  <a href={donation.url} className="text-indigo-600 hover:text-indigo-900">
                    Visit
                  </a>
                } isLast={true} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UserFavoriteList() {

  const dogs = [
    {
      name: 'Rocky',
      breed: 'Pit Bull',
      imageUrl:
        'https://images.pexels.com/photos/7752793/pexels-photo-7752793.jpeg',
    },
    {
      name: 'Rocky',
      breed: 'Pit Bull',
      imageUrl:
        'https://images.pexels.com/photos/7752793/pexels-photo-7752793.jpeg',
    },
    {
      name: 'Rocky',
      breed: 'Pit Bull',
      imageUrl:
        'https://images.pexels.com/photos/7752793/pexels-photo-7752793.jpeg',
    },
  ]

  return (
    <div>
      <Heading type="h3" text="My Favorite Dogs" className="mb-4" />
      <ul role="list">
        {dogs.map((dog) => (
          <li key={dog.name} className="flex items-center gap-x-4 mb-4">
            <img className="h-14 w-14 rounded-full" src={dog.imageUrl} alt="" />
            <div>
              <h3 className="text-base font-semibold leading-6 tracking-tight text-gray-900">{dog.name}</h3>
              <p className="text-sm leading-4 text-teal-600">{dog.breed}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}