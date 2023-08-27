import DashboardStats from "@/app/components/layout/common/DashboardStats"
import Heading from "@/app/components/layout/common/Heading"
import { User } from "@/app/types/user.interface"

export default function ShelterDonationsContent({ account }: { account: User }) {
  return (
    <ShelterStats />
  )
}

function ShelterStats() {

  const stats = [
    { label: 'Sponsored', value: '1 dog' },
    { label: 'Donated to', value: '5 fundraisers' },
  ]

  return (
    <div>

      <DashboardStats stats={stats} />
    </div>
  )
}
