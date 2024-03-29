import { useFundraisers } from "@/app/hooks/api/useFundraisers";
import FundraiserCard from "./FundraiserCard";
import { Fundraiser } from "@/app/types/fundraiser.interface";

type FundraiserListProps = {
  currentFundraiser: Fundraiser;
}

const FundraiserList: React.FunctionComponent<FundraiserListProps> = ({ currentFundraiser }) => {

  const { data: fundraisers } = useFundraisers(4);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {fundraisers?.filter((fundraiser) => fundraiser.id != currentFundraiser.id).map((fundraiser) => (
          <FundraiserCard fundraiser={fundraiser} containerClasses="p-3.5 md:p-5 bg-white rounded-lg" />
        ))}
      </div>
      <a className="mt-10 table font-medium mx-auto px-8 py-3 border border-zinc-300 rounded-full" href={`/fundraisers/`}>View all fundraisers</a>
    </>
  )

}

export default FundraiserList;