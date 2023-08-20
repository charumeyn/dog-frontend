import Heading from "@/app/components/layout/common/Heading";
import ProgressBar from "@/app/components/layout/common/ProgressBar";
import { useFundraisers } from "@/app/hooks/api/useFundraisers";
import { Fundraiser } from "@/app/types/fundraiser.interface";

type FundraiserCardProps = {
  fundraiser: Fundraiser;
}

const FundraiserCard: React.FunctionComponent<FundraiserCardProps> = ({ fundraiser }) => {

  return (
    <a href={`/fundraisers/${fundraiser.id}`}>
      <div className="relative after:content-[''] after:block after:pb-[100%]">
        <img className="absolute w-full h-full object-cover rounded-lg"
          src={fundraiser.mainImage}
          alt={fundraiser.title} />
      </div >
      <Heading type={"h2"} text={fundraiser.title} className="mt-4 mb-2 text-xl" />
      <p className="text-zinc-600 text-sm">{fundraiser.description}</p>
      <ProgressBar fundraiser={fundraiser} classNames="mt-4" />
    </a>
  )
}

export default FundraiserCard;