import { DonationType } from "@/app/types/enum/donationType.enum";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { useEffect, useMemo, useState } from "react";
import PaypalCheckout from "../../libraries/PaypalCheckout";
import StripeCheckout from "../../libraries/StripeCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Input, { InputType } from "./Input";
import Checkbox from "./Checkbox";
import RadioButton from "./RadioButton";
import Button from "./Button";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import Heading from "./Heading";
import { User } from "@/app/types/user.interface";

type PaymentContentProps = {
  image: string;
  name: string;
  type: DonationType;
  recipientId: number;
  account: User | undefined;
}

const PaymentContent: React.FunctionComponent<PaymentContentProps> = ({ image, name, type, recipientId, account }) => {

  const amountOptions = [10, 20, 30, 50, 100]
  const [amount, setAmount] = useState<number | undefined>(0);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | undefined>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    if (isChecked) {
      setAmount(0)
    } else {
      setAmount(10)
    }
  }, [isChecked, setAmount])


  return (
    <div className="bg-white rounded-xl">
      <div className="px-6 pb-8 pt-10 border-b border-zinc-100">
        <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto" />
        <Heading type={"h1"} text={`You are sponsoring ${name} ❤️`} className="text-center mt-5" />
      </div>

      <div className="px-8 pb-8">
        <div className="pt-6">
          <h2 className="text-base font-semibold leading-7 text-zinc-900">Choose an amount</h2>
          <div className="grid grid-cols-5 gap-3 mt-2">
            {amountOptions.map((option) =>
              <div key={option}
                onClick={() => {
                  setAmount(option)
                }}
                className={`${option === amount ? "bg-teal-600 text-white hover:bg-teal-500" : "ring-1 ring-inset ring-zinc-300  text-zinc-900 hover:bg-zinc-50"} 
                ${isChecked ? "bg-zinc-200 pointer-events-none opacity-50" : ""}  flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer`}>
                {option}
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Checkbox label="Enter custom amount" name="isChecked" isChecked={isChecked} setIsChecked={setIsChecked} />
          {isChecked ?
            <Input
              type={InputType.Text}
              name="customAmount"
              placeholder="Enter amount"
              onChange={(e: any) => {
                setAmount(Number(e.target.value))
              }}
            />
            : null}
        </div>

        <div className="pt-8">
          <h2 className="text-base font-semibold leading-7 text-zinc-900">Payment Method</h2>
          <div className="flex items-center space-x-10 space-y-0 mt-2">
            {Object.values(PaymentGateway).map((value) =>
              <RadioButton value={value} selected={selectedGateway} setSelected={setSelectedGateway} />
            )}
          </div>
        </div>

        {selectedGateway === PaymentGateway.Paypal ?
          <PaypalCheckout donationType={DonationType.Dog} recipientType={RecipientType.Dog} recipientId={recipientId} amount={amount} account={account} />
          :
          selectedGateway === PaymentGateway.Stripe ?
            <Elements stripe={stripePromise}>
              <StripeCheckout donationType={DonationType.Dog} recipientType={RecipientType.Dog} recipientId={recipientId} amount={amount} account={account} />
            </Elements>
            :
            <div className="col-span-2 mt-4">
              <Button type="submit" content="Select a payment method" classNames="w-full" disabled={true} />
            </div>
        }

      </div>
    </div >
  )
}

export default PaymentContent;