import { Donation } from "@/app/types/donation.interface";
import moment from "moment";

type DonationListProps = {
  donation: Donation;
}


const DonationList: React.FunctionComponent<DonationListProps> = ({ donation }) => {
  return (
    <div key={donation.id} className="flex gap-x-4 items-center mb-5">
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src={"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
        alt={donation.transactionFirstName}
      />
      <div>
        <p className="mb-0.5">{donation.transactionFirstName} {donation.transactionLastName}</p>
        <p>
          <strong>${donation.amount}</strong> <span className="text-zinc-400">•</span> {moment(donation.createdAt).format("YYYYMMDD")}
        </p>
      </div>
    </div>
  )
}


export default DonationList;