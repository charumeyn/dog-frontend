"use client"

import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCallback, useState } from "react";

type PaypalCheckoutProps = {
  payment: DonationCreateDto;
}

const PaypalCheckout: React.FunctionComponent<PaypalCheckoutProps> = ({ payment }) => {

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

  const handleApprove = (orderId: number) => {
    // Call backend function to fulfill order

    console.log(orderId)
    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    alert("Thank you for your purchase!");
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }


  return (
    <>
      <span onClick={() => createDonation(payment)}>test create donation</span>
      <PayPalButtons style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill"
      }}
        createOrder={(data, actions) => {
          console.log("createOrder data", data)
          console.log("createOrder", actions)
          return actions.order.create({
            purchase_units: [
              {
                description: payment.type + " | " + payment.dog_id + payment.fundraiser_id,
                amount: {
                  value: String(payment.amount)
                }
              }
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const order = await actions.order.capture();
            console.log("onApprove data", data);
            console.log("onApprove order", order);
            console.log("useCreateDonation order", payment);
            createDonation(payment)
            handleApprove(Number(data.orderID));
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
      /></>
  );
};

export default PaypalCheckout;