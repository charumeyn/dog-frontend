import PaypalCheckout from "@/app/components/libraries/PaypalCheckout"
import { Dog } from "@/app/types/dog.interface"
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum"
import { RecipientType } from "@/app/types/enum/recipientType.enum"
import { Fundraiser } from "@/app/types/fundraiser.interface"

type FundraiserInfoProps = {
  fundraiser: Fundraiser | undefined
}

const FundraiserInfo: React.FunctionComponent<FundraiserInfoProps> = ({ fundraiser }) => {

  return (
    <>
      <h1 className="text-4xl mb-2">{fundraiser?.title}</h1>
      <p className="text-gray-500 mb-8">$100 raiser of $200</p>
      <PaypalCheckout fundraiser={fundraiser} />
      <a href="" className="w-full inline-block text-center mt-5 text-md">Share</a>
      <p className="mt-10 font-medium">Latest donation</p>
      <div className="flex gap-x-5 mt-2 items-center mb-5">
        <img src="https://images.pexels.com/photos/3104709/pexels-photo-3104709.jpeg" className="w-16 h-16 rounded-full" />
        <div>
          <p className="text-sm">insert donor name</p>
          <p className="text-sm text-gray-500">insert donation amount - insert date</p>
        </div>
      </div>
      <a href="" className="text-sm">View list of donors</a>
    </>
  )
}

export default FundraiserInfo;