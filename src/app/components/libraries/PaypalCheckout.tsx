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
  amount?: number;
}

const PaypalCheckout: React.FunctionComponent<PaypalCheckoutProps> = ({ type, recipient_id, amount }) => {

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
            value: amount
          }
        }
      ]
    })
  }, [amount, recipient_id])

  return (
    <div>
      <div className="mt-5">
        <PayPalButtons
          forceReRender={[amount]}
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