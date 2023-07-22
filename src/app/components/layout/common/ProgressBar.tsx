import { Fundraiser } from "@/app/types/fundraiser.interface";
import { useMemo } from "react";

type ProgressBarProps = {
  fundraiser?: Fundraiser;
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({ fundraiser }) => {

  const totalDonations = useMemo(() => {
    if (fundraiser && fundraiser?.donations.length > 0) {
      return fundraiser?.donations.reduce((total, x) => total + x.amount, 0);
    } else return 0
  }, [fundraiser])

  return (
    fundraiser ?
      <div className="w-full bg-orange-100 rounded-full h-3 mb-2">
        <div className={`bg-orange-600 h-3 rounded-full`} style={{ ["width" as any]: (totalDonations / fundraiser?.goal_amount) * 100 + '%' }}></div>
      </div> : null
  )
}


export default ProgressBar;