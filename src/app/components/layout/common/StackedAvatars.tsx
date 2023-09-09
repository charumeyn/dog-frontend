import { Donation } from "@/app/types/donation.interface";
import ButtonLink from "./ButtonLink";
import { useDonation } from "@/app/hooks/api/useDonations";

type StackedAvatarsProps = {
  images?: string[];
  text: string;
  url?: string;
  onClick?: () => void;
  donations?: Donation[]
}

const StackedAvatars: React.FunctionComponent<StackedAvatarsProps> = ({ text, url, onClick, donations }) => {

  return (
    <div className="flex items-center gap-x-3 hover:cursor-pointer">
      <div className="flex -space-x-2 overflow-hidden">
        {donations?.slice(0, 3).map((donation, i) => (
          <Avatars key={i} donationId={donation.id} />
        ))}
      </div>
      <div>
        {url ? <a href={url}>{text}</a> : onClick ? <span className="text-sm text-zinc-500" onClick={onClick}>{text}</span> : text}
      </div>
    </div>
  )
}

function Avatars({ donationId }: { donationId: number }) {

  const { data: donation } = useDonation(donationId)

  return (
    <img src={donation?.donor.image} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
  )
}

export default StackedAvatars;