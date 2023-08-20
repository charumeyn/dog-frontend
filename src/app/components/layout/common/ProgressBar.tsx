import { Fundraiser } from "@/app/types/fundraiser.interface";
import { useMemo } from "react";

type ProgressBarProps = {
  fundraiser: Fundraiser;
  classNames?: string;
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({ fundraiser, classNames }) => {


  const total = useMemo(() => {
    if (fundraiser && fundraiser?.donations.length > 0) {
      return fundraiser?.donations.reduce((total, x) => total + x.amount, 0);
    } else return 0
  }, [fundraiser])

  const percent = useMemo(() => {
    return (total / 100) * 100 + `%`
  }, [total])


  return (
    fundraiser ?
      <div className={`${classNames ? classNames : ""}`}>
        <div className="flex w-full font-medium items-center">
          <div className="w-full bg-orange-100 rounded-full h-3">
            <div className={`bg-orange-600 h-3 rounded-full`} style={{ ["width" as any]: (total / fundraiser?.goalAmount) * 100 + '%' }}></div>
          </div>
          <div className="w-14 text-right">
            {percent}
          </div>
        </div>
        <p><span className="font-medium">${total}</span> raised of ${fundraiser?.goalAmount} </p>
      </div> : null
  )
}


export default ProgressBar;