"use client";

import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { SuccessResult } from "@/app/types/apiResult";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import Input, { InputType } from "../layout/common/Input";
import Button from "../layout/common/Button";

type StripeCheckoutProps = {
  type: DonationType;
  recipient_id: number;
  amount?: number;
}


const StripeCheckout: React.FunctionComponent<StripeCheckoutProps> = ({ type, recipient_id, amount }) => {

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

  const disableButton = useMemo(() => {
    return amount == 0 || firstName === "" || lastName === "";
  }, [amount, firstName, lastName])


  return (
    <form onSubmit={onSubmit}>
      <div className="mt-4 grid grid-cols-2 gap-y-6 gap-x-4">

        <Input
          type={InputType.Text}
          name="firstName"
          label="First Name"
          placeholder="First Name"
          onChange={(e: any) => setFirstName(e.target.value)}
        />

        <Input
          type={InputType.Text}
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          onChange={(e: any) => setLastName(e.target.value)}
        />

        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-zinc-900">
            Card details
          </label>
          <CardElement
            className="mt-2 col-span-2 block w-full rounded-md border-0 px-3 py-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 sm:leading-6"
          />
        </div>

        <div className="col-span-2 mt-2">
          <Button type="submit" text="Pay with Card" classNames="w-full" disabled={disableButton} />
        </div>
      </div>



    </form>
  );
}

export default StripeCheckout;