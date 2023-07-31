"use client";

import PaypalCheckout from "@/app/components/libraries/PaypalCheckout"
import StripeCheckout from "@/app/components/libraries/StripeCheckout";
import { Dog } from "@/app/types/dog.interface"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type DogInfoProps = {
  dog: Dog | undefined
}



const DogInfo: React.FunctionComponent<DogInfoProps> = ({ dog }) => {

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );


  return (
    <>
      <h1 className="text-4xl mb-2">Hello, I'm <strong>{dog?.name}</strong></h1>
      <p className="text-gray-500 mb-8">Location</p>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        <div className="col-span-1">
          <p className="text-gray-500 text-sm">Breed</p>
          <p><strong>{dog?.breed}</strong></p>
        </div>
        <div className="col-span-1">
          <p className="text-gray-500 text-sm">Size</p>
          <p><strong>{dog?.size}</strong></p>
        </div>
        <div className="col-span-1">
          <p className="text-gray-500 text-sm">Age</p>
          <p><strong></strong></p>
        </div>
        <div className="col-span-1">
          <p className="text-gray-500 text-sm">Color</p>
          {dog?.color.map((color, i) =>
            <p key={i}><strong>{color}</strong></p>
          )}
        </div>
        <div className="col-span-1">
          <p className="text-gray-500 text-sm">Gender</p>
          <p><strong>{dog?.gender}</strong></p>
        </div>
        <div className="col-span-1">
          <p className="text-gray-500 text-sm">Coat</p>
          <p><strong>{dog?.coat_length}</strong></p>
        </div>
      </div>
      <PaypalCheckout dog={dog} />
      <Elements stripe={stripePromise}>
        <StripeCheckout />
      </Elements>
      <div className="grid grid-cols-2 text-center">
        <a href="">Share</a>
        <a href="">Add to favorites</a>
      </div>
    </>
  )
}

export default DogInfo;