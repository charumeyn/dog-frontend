import { Capsule } from "@/app/components/layout/common/Capsule";
import Heading from "@/app/components/layout/common/Heading";
import ProgressBar from "@/app/components/layout/common/ProgressBar";
import { useFundraisers } from "@/app/hooks/api/useFundraisers";
import { FundraiserStatus } from "@/app/types/enum/fundraiserStatus.enum";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import moment from "moment";
import { useMemo } from "react";

type FundraiserCardProps = {
  fundraiser: Fundraiser;
}

const FundraiserCard: React.FunctionComponent<FundraiserCardProps> = ({ fundraiser }) => {

  const status = useMemo(() => {
    const today = new Date()
    if (moment(today).isAfter(fundraiser.startsAt) && moment(fundraiser.endsAt).isAfter(today)) {
      return {
        text: "In Progress",
        color: "orange"
      }
    } else if (moment(today).isAfter(fundraiser.startsAt) && moment(fundraiser.endsAt).isBefore(today)) {
      return {
        text: "Ended",
        color: "grey"
      }
    } else {
      return {
        text: "Not Started",
        color: "blue"
      }
    }
  }, [fundraiser])



  return (
    <a href={`/fundraisers/${fundraiser.id}`}>
      <div className="relative after:content-[''] after:block after:pb-[100%] mb-3">
        <img className="absolute w-full h-full object-cover rounded-lg"
          src={fundraiser.mainImage}
          alt={fundraiser.title} />
      </div >
      <Capsule children={status.text} color={status.color} />

      <Heading type={"h2"} text={fundraiser.title} className="mt-4 mb-2 text-xl" />
      <p className="text-zinc-600 text-sm">{fundraiser.description}</p>
      <ProgressBar fundraiser={fundraiser} classNames="mt-4" />
    </a>
  )
}

export default FundraiserCard;