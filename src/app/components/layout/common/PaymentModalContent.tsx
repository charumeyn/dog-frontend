import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import { useCallback, useMemo, useState } from "react";
import PaypalCheckout from "../../libraries/PaypalCheckout";
import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { SuccessResult } from "@/app/types/apiResult";
import StripeCheckout from "../../libraries/StripeCheckout";
import { Donation } from "@/app/types/donation.interface";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type PaymentModalContentProps = {
  image: string;
  name: string;
  type: DonationType;
  recipient_id: number;
  setIsOpen: (isOpen: boolean) => void;
}

const PaymentModalContent: React.FunctionComponent<PaymentModalContentProps> = ({ image, name, type, recipient_id, setIsOpen }) => {

  const [amount, setAmount] = useState<number | undefined>(0);
  const [customAmount, setCustomAmount] = useState<number | undefined>(0);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | undefined>();
  const amountOptions = [10, 20, 30, 50, 100]

  const finalAmount = useMemo(() => {
    if (amount != undefined || amount != 0) {
      return amount
    } else {
      return customAmount
    }
  }, [amount, customAmount])


  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );


  return (
    <div>
      <div className="bg-gray-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <img src={image} alt={name} className="w-20 h-20 rounded-full mx-auto" />
        <h1 className="text-center">You are sponsoring <strong>{name}</strong>❤️</h1>
      </div>

      <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h2>Choose an amount</h2>
        <div className="grid grid-cols-3 gap-2">
          {amountOptions.map((option) =>
            <div key={option}
              onClick={() => {
                setAmount(option)
                setCustomAmount(0)
              }}
              className={`${option === amount ? "border-orange-600 bg-orange-600 text-white" : "hover:text-orange-600 hover:bg-orange-50 hover:border-orange-100"} grid-col-1 text-center border border-gray-200 rounded-md text-gray-500 font-medium hover:cursor-pointer py-3`}>
              ${option}
            </div>
          )}
          <input type="text"
            name="customAmount"
            id="customAmount"
            value={customAmount}
            onChange={(e: any) => {
              setCustomAmount(Number(e.target.value))
              setAmount(0)
            }}
            className="w-full border border-gray-200 rounded-md text-gray-800 font-medium py-3 px-3 focus:ring-0 focus:border-orange-500"
            placeholder="Enter amount"
          />
        </div>
      </div>

      <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h2>Payment Method</h2>
        {Object.values(PaymentGateway).map((value) => (
          <div
            key={value}
            className="flex items-center"
          >
            <input
              id={value}
              type="radio"
              value={value}
              name="status-radio"
              className="w-4 h-4 "
              onChange={() => setSelectedGateway(value)}
              checked={selectedGateway === value}
            />
            <label
              htmlFor={value}
              className="text-sm font-medium text-gray-900 dark:text-gray-300 px-5 py-2 border-2 border-transparent peer-checked:border-2 peer-checked:rounded-3xl peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:cursor-pointer"
            >
              {value === PaymentGateway.Stripe ? "Credit or Debit" : value}
            </label>
          </div>
        ))}
      </div>

      {selectedGateway === PaymentGateway.Paypal ?
        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <PaypalCheckout type={DonationType.Dog} recipient_id={recipient_id} finalAmount={finalAmount} />
        </div>
        :
        selectedGateway === PaymentGateway.Stripe ?
          <Elements stripe={stripePromise}>
            <StripeCheckout type={DonationType.Dog} recipient_id={recipient_id} finalAmount={finalAmount} />
          </Elements>
          :
          null}
    </div>
  )
}

export default PaymentModalContent;