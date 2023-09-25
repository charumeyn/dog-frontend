"use client"

import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { SuccessResult } from "@/app/types/apiResult";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { User } from "@/app/types/user.interface";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type PaypalCheckoutProps = {
  donationType: DonationType;
  recipientType: RecipientType;
  recipientId?: number;
  fundraiserId?: number;
  amount?: number;
  account?: User;
}

const PaypalCheckout: React.FunctionComponent<PaypalCheckoutProps> = ({ donationType, recipientType, recipientId, fundraiserId, amount, account }) => {

  const [error, setError] = useState<string[]>([])
  const router = useRouter();

  const onSuccess = useCallback((data: SuccessResult<Donation>) => {
    if (data.success) {
      if (fundraiserId) {
        router.push(`/thank-you?donationType=${donationType}&id=${data.data.id}&recipientType=${recipientType}&recipientId=${recipientId}&fundraiserId=${fundraiserId}`)
      } else {
        router.push(`/thank-you?donationType=${donationType}&id=${data.data.id}&recipientType=${recipientType}&recipientId=${recipientId}`)
      }
    }
  }, [donationType, recipientType, recipientId, fundraiserId]);

  const onError = useCallback((error: any) => {
    setError(error.message)
  }, [setError])

  const { mutate: createDonation } = useCreateDonation(onSuccess, onError);

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
      donorId: account && account.id,
    }

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