"use client";

import { IconDog, IconHeart, IconHome, IconPin, IconShare } from "@/app/components/layout/Icons";
import Button from "@/app/components/layout/common/Button";
import ButtonLink from "@/app/components/layout/common/ButtonLink";
import PaymentModal from "@/app/components/layout/common/PaymentModal";
import PaymentModalContent from "@/app/components/layout/common/PaymentModalContent";
import StackedAvatars from "@/app/components/layout/common/StackedAvatars";
import PaypalCheckout from "@/app/components/libraries/PaypalCheckout"
import StripeCheckout from "@/app/components/libraries/StripeCheckout";
import { Dog } from "@/app/types/dog.interface"
import { DonationType } from "@/app/types/enum/donationType.enum";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment";
import { useState } from "react";

type DogInfoProps = {
  dog: Dog | undefined
}

const DogInfo: React.FunctionComponent<DogInfoProps> = ({ dog }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDonations, setShowDonations] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Hello, I'm <strong>{dog?.name}</strong></h1>
        <div className="flex gap-x-1 items-center text-sm text-zinc-500"><IconShare className="w-3 h-3" /> Share</div>
      </div>
      <div className="flex items-center gap-x-1 mt-1 text-zinc-500 mb-4"><IconPin /> Location</div>
      <div className="text-zinc-900 mb-5">{dog?.description}</div>

      <StackedAvatars text={"100 sponsors"} onClick={() => setShowDonations(true)} />


      <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-6">

        <div className="flex gap-x-2">
          <IconDog className="w-10 h-10 text-teal-600" />
          <div>
            <p className="text-zinc-500 text-sm">Breed</p>
            <p className="text-lg font-bold">{dog?.breed}</p>
          </div>
        </div>

        <div className="flex gap-x-2">
          <IconDog className="w-10 h-10 text-teal-600" />
          <div>
            <p className="text-zinc-500 text-sm">Age</p>
            <p className="text-lg font-bold">{moment(dog?.birthdate).format("YYYYMMDD")}</p>
          </div>
        </div>

        <div className="flex gap-x-2">
          <IconDog className="w-10 h-10 text-teal-600" />
          <div>
            <p className="text-zinc-500 text-sm">Gender</p>
            <p className="text-lg font-bold">{dog?.gender}</p>
          </div>
        </div>

        <div className="flex gap-x-2">
          <IconDog className="w-10 h-10 text-teal-600" />
          <div>
            <p className="text-zinc-500 text-sm">Size</p>
            <p className="text-lg font-bold">{dog?.size}</p>
          </div>
        </div>

      </div>

      <Button
        text={"Sponsor Me!"}
        type="button"
        onClick={() => setIsOpen(true)}
        classNames="my-5"
      />

      <div className="flex gap-x-2 justify-center text-zinc-500 text-sm">
        <IconHeart className="w-4 w-5" />Add to favorites
      </div>


      <PaymentModal isOpen={isOpen} setIsOpen={setIsOpen}>
        {dog &&
          <PaymentModalContent image={dog.images[0]} name={dog.name} type={DonationType.Dog} recipient_id={dog.id} setIsOpen={setIsOpen} />
        }
      </PaymentModal>
    </>
  )
}

export default DogInfo;