import { useDonation } from "@/app/hooks/api/useDonations";
import { Donation } from "@/app/types/donation.interface";
import moment from "moment";

export function DonationRow({ id }: { id: number }) {

  const { data: donation } = useDonation(id)

  return (
    donation ?
      <div className="flex gap-x-4 items-center mb-5">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src={donation.donor?.image}
          alt={donation.donor?.firstName}
        />
        <div>
          <p className="mb-0.5">{donation.donor?.firstName} {donation.donor?.lastName}</p>
          <p>
            <strong>${donation.amount}</strong>
            <span className="text-zinc-400"> • </span>
            <span className="text-zinc-400 text-sm">{moment(donation.createdAt).fromNow()}</span>
          </p>
        </div>
      </div> : null
  )
}