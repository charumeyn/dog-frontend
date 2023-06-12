"use client"

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PaypalCheckoutButton = (props: any) => {
  const { product } = props;

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
    <PayPalButtons style={{
      color: "silver",
      layout: "horizontal",
      height: 48,
      tagline: false,
      shape: "pill"
    }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              //can adjust currenct in amount object
              amount: {
                value: product.price
              }
            }
          ]
        });
      }}
      onApprove={async (data, actions) => {
        if (actions.order) {
          const order = await actions.order.capture();
          console.log("order", order);

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
  );
};

export default PaypalCheckoutButton;