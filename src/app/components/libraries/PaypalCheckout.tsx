"use client"

import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { Account } from "@/app/types/account.interface";
import { SuccessResult } from "@/app/types/apiResult";
import { Dog } from "@/app/types/dog.interface";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCallback, useMemo, useState } from "react";

type PaypalCheckoutProps = {
  donationType: DonationType;
  recipientType: RecipientType;
  recipientId?: number;
  fundraiserId?: number;
  amount?: number;
  account: SuccessResult<Account> | undefined;
}

const PaypalCheckout: React.FunctionComponent<PaypalCheckoutProps> = ({ donationType, recipientType, recipientId, fundraiserId, amount, account }) => {

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
      transactionId: order.id,
      transactionFirstName: order.payer.name.given_name,
      transactionLastName: order.payer.name.surname,
      email: order.payer.email_address,
      recipientType: recipientType === RecipientType.Dog ? RecipientType.Dog : recipientType === RecipientType.Shelter ? RecipientType.Shelter : RecipientType.User,
      donationType: donationType === DonationType.Dog ? DonationType.Dog : DonationType.Fundraiser,
      paymentGateway: PaymentGateway.Paypal,
      status: order.status,
      amount: Number(order.purchase_units[0].amount.value),
      dogId: recipientType === RecipientType.Dog ? recipientId : undefined,
      shelterId: recipientType === RecipientType.Shelter ? recipientId : undefined,
      userId: recipientType === RecipientType.User ? recipientId : undefined,
      fundraiserId: fundraiserId ? fundraiserId : undefined,
      donorId: account && account.data.data.id,
    }

    console.log(body);

    createDonation(body)
  }, [createDonation])

  const handleCreateOrder = useCallback((actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: `Donation for ${fundraiserId ? `Fundraiser ID ${fundraiserId}` : `Dog ID ${recipientId}`} `,
          amount: {
            value: amount
          }
        }
      ]
    })
  }, [amount])

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