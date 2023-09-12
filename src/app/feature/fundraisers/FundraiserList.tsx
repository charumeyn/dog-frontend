import { useFundraisers } from "@/app/hooks/api/useFundraisers";
import FundraiserCard from "./FundraiserCard";
import ButtonLink from "@/app/components/layout/common/ButtonLink";
import { Fundraiser } from "@/app/types/fundraiser.interface";

type FundraiserListProps = {
  currentFundraiser?: Fundraiser;
}

const FundraiserList: React.FunctionComponent<FundraiserListProps> = ({ currentFundraiser }) => {

  const { data: fundraisers } = useFundraisers(4);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {fundraisers?.map((fundraiser) => (
          <FundraiserCard fundraiser={fundraiser} />
        ))}
      </div>
      <a className="mt-10 block table font-medium mx-auto px-8 py-3 border border-zinc-300 rounded-full" href={`/fundraisers/`}>View all fundraisers</a>
    </>
  )

}

export default FundraiserList;