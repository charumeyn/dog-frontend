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
      <div className="grid grid-cols-4 gap-x-8">
        {fundraisers?.map((fundraiser) => (
          <FundraiserCard fundraiser={fundraiser} />
        ))}
      </div>
      <ButtonLink url={"/fundraisers"} text={"View other fundraisers >"} color="bg-white text-teal-600 border border-teal-600" classNames="table mx-auto mt-5" />
    </>
  )

}

export default FundraiserList;