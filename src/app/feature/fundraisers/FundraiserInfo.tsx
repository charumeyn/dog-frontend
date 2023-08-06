import ProgressBar from "@/app/components/layout/common/ProgressBar"
import PaypalCheckout from "@/app/components/libraries/PaypalCheckout"
import { Dog } from "@/app/types/dog.interface"
import { Donation } from "@/app/types/donation.interface"
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum"
import { RecipientType } from "@/app/types/enum/recipientType.enum"
import { Fundraiser } from "@/app/types/fundraiser.interface"
import moment from "moment"
import { useEffect, useMemo } from "react"

type FundraiserInfoProps = {
  fundraiser: Fundraiser | undefined
}

const FundraiserInfo: React.FunctionComponent<FundraiserInfoProps> = ({ fundraiser }) => {

  const totalDonations = useMemo(() => {
    if (fundraiser && fundraiser?.donations.length > 0) {
      return fundraiser?.donations.reduce((total, thing) => total + thing.amount, 0);
    } else return 0
  }, [fundraiser])

  return (
    <>
      <h1 className="text-4xl mb-4">{fundraiser?.title}</h1>
      <ProgressBar fundraiser={fundraiser} />
      <p className="text-zinc-500 mb-8">${totalDonations} {' '} raised out of ${fundraiser?.goal_amount}</p>
      <PaypalCheckout fundraiser={fundraiser} />
      <a href="" className="w-full inline-block text-center mt-5 text-md">Share</a>

      {fundraiser && fundraiser?.donations.length > 0 ?
        <div>
          <p className="mt-10 font-medium">Latest donation</p>
          <div className="flex gap-x-5 mt-2 items-center mb-5">
            <img src="https://images.pexels.com/photos/3104709/pexels-photo-3104709.jpeg" className="w-16 h-16 rounded-full" />
            <div>
              <p className="text-sm">{fundraiser.donations[0].transaction_firstname}</p>
              <p className="text-sm text-zinc-500">${fundraiser.donations[0].amount} • {moment(fundraiser.donations[0].created_at).startOf('hour').fromNow()}</p>
            </div>
          </div>
          {/* <a href="" className="text-sm">View list of donors</a> */}
        </div> : null}
    </>
  )
}

export default FundraiserInfo;