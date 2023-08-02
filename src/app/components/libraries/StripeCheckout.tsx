"use client";

import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { SuccessResult } from "@/app/types/apiResult";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useCallback, useState } from "react";

type StripeCheckoutProps = {
  type: DonationType;
  recipient_id: number;
  finalAmount?: number;
}


const StripeCheckout: React.FunctionComponent<StripeCheckoutProps> = ({ type, recipient_id, finalAmount }) => {

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

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

  const handleOnApprove = useCallback((order: any) => {

    const body: DonationCreateDto = {
      transaction_id: order.id,
      email: order.email,
      payment_gateway: PaymentGateway.Stripe,
      type: type === DonationType.Fundraiser ? DonationType.Fundraiser : DonationType.Dog,
      status: order.status,
      amount: order.amount,
      dog_id: type === DonationType.Dog ? recipient_id : undefined,
      fundraiser_id: type === DonationType.Fundraiser ? recipient_id : undefined,
      user_id: 1,
      donor_id: 1,
      transaction_firstname: firstName,
      transaction_lastname: lastName,
      created_at: new Date(),
    }

    console.log(body);

    createDonation(body)
  }, [type, recipient_id, firstName, lastName, createDonation])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: {
          amount: 89,
          currency: 'usd',
          description: "test",
          email: 'char1@gmail.com',
        },
      });
      const clientSecret = data.clientSecret;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      handleOnApprove(data)
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="px-4 pb-4">
        <CardElement className="border border-2 border-teal-600 px-5 py-5 rounded-lg" />
        <button className="text-center text-white px-5 py-3 font-bold rounded-lg bg-teal-600 w-full mt-5 hover:bg-teal-700" type="submit">Pay with Card</button>
      </div>
    </form>
  );
}

export default StripeCheckout;