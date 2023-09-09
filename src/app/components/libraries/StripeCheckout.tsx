"use client";

import { useCreateDonation } from "@/app/hooks/api/useDonations";
import { SuccessResult } from "@/app/types/apiResult";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import Input, { InputType } from "../layout/common/Input";
import Button from "../layout/common/Button";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/user.interface";
import Alert from "../layout/common/Alert";

type StripeCheckoutProps = {
  donationType: DonationType;
  recipientType: RecipientType;
  recipientId?: number;
  fundraiserId?: number;
  amount?: number;
  account?: User;
}


const StripeCheckout: React.FunctionComponent<StripeCheckoutProps> = ({ recipientType, donationType, recipientId, fundraiserId, amount, account }) => {

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [error, setError] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const onSuccess = useCallback((data: SuccessResult<Donation>) => {
    if (data.success) {
      router.push(`/thank-you?donationType=${donationType}&id=${data.data.id}&recipientType=${recipientType}&recipientId=${recipientId}`)
    }
  }, []);

  const onError = useCallback((error: any) => {
    setError(error.message)
  }, [setError])

  const { mutate: createDonation, isLoading } = useCreateDonation(onSuccess, onError);

  const handleOnApprove = useCallback((order: any) => {

    const body: DonationCreateDto = {
      transactionId: order.id,
      transactionFirstName: firstName,
      transactionLastName: lastName,
      email: order.email,
      recipientType: recipientType === RecipientType.Dog ? RecipientType.Dog : recipientType === RecipientType.Shelter ? RecipientType.Shelter : RecipientType.User,
      donationType: donationType === DonationType.Dog ? DonationType.Dog : DonationType.Fundraiser,
      paymentGateway: PaymentGateway.Stripe,
      status: order.status,
      amount: order.amount / 100,
      dogId: recipientType === RecipientType.Dog ? recipientId : undefined,
      shelterId: recipientType === RecipientType.Shelter ? recipientId : undefined,
      userId: recipientType === RecipientType.User ? recipientId : undefined,
      fundraiserId: fundraiserId ? fundraiserId : undefined,
      donorId: account && account.id,
    }

    createDonation(body)
  }, [firstName, lastName, createDonation])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true)
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: {
          amount: amount,
          currency: 'usd',
          description: `Donation for ${fundraiserId ? `Fundraiser ID ${fundraiserId}` : `Dog ID ${recipientId}`} `,
          email: account && account.email,
        },
      });
      const clientSecret = data.clientSecret;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      handleOnApprove(data)
    } catch (error) {
      setError(error as string[])
    }
  };

  const disableButton = useMemo(() => {
    return amount == 0 || firstName === "" || lastName === "";
  }, [amount, firstName, lastName])


  return (
    <form onSubmit={onSubmit}>

      <Alert type="error" message={error} setMessage={setError} />

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
          <Button type="submit" content={isLoading || isSubmitting ? "Loading..." : "Pay with Card"} classNames="w-full" disabled={disableButton || isLoading || isSubmitting} />
        </div>
      </div>
    </form>
  );
}

export default StripeCheckout;