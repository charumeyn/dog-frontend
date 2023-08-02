"use client"

import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { SuccessResult } from "@/app/types/apiResult";
import { Dog } from "@/app/types/dog.interface";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCallback, useMemo, useState } from "react";

type PaypalCheckoutProps = {
  type: DonationType;
  recipient_id: number;
  finalAmount?: number;
}

const PaypalCheckout: React.FunctionComponent<PaypalCheckoutProps> = ({ type, recipient_id, finalAmount }) => {

  const onCreateSuccess = useCallback((data: SuccessResult<Donation>) => {
    console.log("onSuccess", data)
    window.location.reload();
  },
    []
  );

  const onCreateError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { mutate: createDonation } = useCreateDonation(onCreateSuccess, onCreateError);

  const [error, setError] = useState("");
  // const [amount, setAmount] = useState<number | undefined>(0);
  // const [customAmount, setCustomAmount] = useState<number | undefined>(0);

  // const finalAmount = useMemo(() => {
  //   if (amount != undefined || amount != 0) {
  //     return amount
  //   } else {
  //     return customAmount
  //   }
  // }, [amount, customAmount])

  // const amountOptions = [10, 20, 30, 50, 100, 200]

  const handleOnApprove = useCallback((order: any) => {

    const body: DonationCreateDto = {
      transaction_id: order.id,
      email: order.payer.email_address,
      payment_gateway: PaymentGateway.Paypal,
      type: type === DonationType.Fundraiser ? DonationType.Fundraiser : DonationType.Dog,
      status: order.status,
      amount: Number(order.purchase_units[0].amount.value),
      dog_id: type === DonationType.Dog ? recipient_id : undefined,
      fundraiser_id: type === DonationType.Fundraiser ? recipient_id : undefined,
      user_id: 1,
      donor_id: 1,
      transaction_firstname: order.payer.name.given_name,
      transaction_lastname: order.payer.name.surname,
      created_at: new Date(),
    }

    createDonation(body)
  }, [type, recipient_id, createDonation])

  const handleCreateOrder = useCallback((actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: type === DonationType.Fundraiser ? `Fundraiser ID: ${recipient_id}` : `Dog ID: ${recipient_id}`,
          amount: {
            value: finalAmount
          }
        }
      ]
    })
  }, [finalAmount, recipient_id])

  return (
    <div>

      {/* <div className="grid grid-cols-3 gap-2">
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
        <div className="col-span-3 mt-2 mb-4">
          <label>
            <span className="text-sm text-gray-600">Or enter a custom amount</span>
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
          </label>
        </div>
      </div> */}

      <div className="mt-5">
        <PayPalButtons
          forceReRender={[finalAmount]}
          style={{
            color: "gold",
            layout: "horizontal",
            height: 48,
            tagline: false,
            shape: "rect",
          }}
          createOrder={(data, actions) =>
            handleCreateOrder(actions)
          }
          onApprove={async (data, actions) => {
            if (actions.order) {
              const order = await actions.order.capture();
              handleOnApprove(order)
            }
          }}
          onError={(err: any) => {
            setError(err);
            console.error("Error", err);
          }}
          onCancel={() => {
            alert("Cancelled")
          }}
          onClick={(data, actions) => {
            return actions.resolve();
          }}
        />
      </div>
    </div>
  );
};

export default PaypalCheckout;