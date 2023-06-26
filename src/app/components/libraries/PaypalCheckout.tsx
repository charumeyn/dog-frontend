"use client"

import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { SuccessResult } from "@/app/types/apiResult";
import { Dog } from "@/app/types/dog.interface";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCallback, useState } from "react";

type PaypalCheckoutProps = {
  fundraiser?: Fundraiser;
  dog?: Dog;
}

const PaypalCheckout: React.FunctionComponent<PaypalCheckoutProps> = ({ fundraiser, dog }) => {


  const onCreateSuccess = useCallback((data: SuccessResult<Donation>) => {
    console.log("onSuccess", data)
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

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState<number>(0);

  // const handleApprove = (orderId: number) => {
  //   // Call backend function to fulfill order

  //   console.log(orderId)
  //   // if response is success
  //   setPaidFor(true);
  //   // Refresh user's account or subscription status

  //   // if response is error
  //   // setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  // };

  // if (paidFor) {
  //   // Display success message, modal or redirect user to success page
  //   alert("Thank you for your purchase!");
  // }

  // if (error) {
  //   // Display error message, modal or redirect user to error page
  //   alert(error);
  // }

  const handleCreateDonation = useCallback((order: any) => {

    const body: DonationCreateDto = {
      transaction_id: order.id,
      email: order.payer.email_address,
      payment_gateway: PaymentGateway.paypal,
      type: fundraiser ? RecipientType.fundraiser : RecipientType.dog,
      status: order.status,
      amount: amount,
      dog_id: dog ? dog?.id : undefined,
      fundraiser_id: fundraiser ? fundraiser?.id : undefined,
      user_id: 1,
      transaction_firstname: order.payer.name.given_name,
      transaction_lastname: order.payer.name.surname,
      created_at: new Date(),
    }

    createDonation(body)
    console.log(body)
    alert("Thank you for your purchase!");
  }, [amount, dog, fundraiser, createDonation])



  return (
    <div>
      <input type="text" className="" value={amount} onChange={(e: any) => setAmount(e.target.value)} />
      <PayPalButtons
        className="opacity-0"
        style={{
          color: "gold",
          layout: "horizontal",
          height: 48,
          tagline: false,
          shape: "rect",
        }}
        createOrder={(data, actions) => {
          console.log("createOrder data", data)
          console.log("createOrder", actions)
          return actions.order.create({
            purchase_units: [
              {
                description: fundraiser ? `Fundraiser ID: ${fundraiser?.id}` : `Dog ID: ${dog?.id}`,
                amount: {
                  value: String(30)
                }
              }
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const order = await actions.order.capture();
            handleCreateDonation(order)
          }
        }}
        onError={(err: any) => {
          setError(err);
          console.error("PayPal Checkout onError", err);
        }}
        onCancel={() => {
          // Display cancel message, modal or redirect user to cancel page or back to cart
        }}

        //only when you want to prevent user from re-purchasing the same product
        onClick={(data, actions) => {
          // Validate on button click, client or server side
          const hasAlreadyBoughtCourse = false;

          console.log("onClick", data, actions)

          if (hasAlreadyBoughtCourse) {
            setError(
              "You already bought this course. Go to your account to view your list of courses."
            );

            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
      />
      <span className="-mt-[50px] w-full block text-center bg-orange-600 text-white text-md px-6 py-3 rounded-lg font-medium">Donate</span>
    </div>
  );
};

export default PaypalCheckout;