"use client";

import { IconDog, IconHeart, IconHome, IconPin, IconShare } from "@/app/components/layout/Icons";
import Button from "@/app/components/layout/common/Button";
import PaymentModal from "@/app/components/layout/common/PaymentModal";
import PaymentContent from "@/app/components/layout/common/PaymentContent";
import StackedAvatars from "@/app/components/layout/common/StackedAvatars";
import { Account } from "@/app/types/account.interface";
import { Dog } from "@/app/types/dog.interface"
import { DonationType } from "@/app/types/enum/donationType.enum";
import { Elements } from "@stripe/react-stripe-js";
import moment from "moment";
import { useMemo, useState } from "react";
import { SuccessResult } from "@/app/types/apiResult";
import ButtonLink from "@/app/components/layout/common/ButtonLink";
import Link from "next/link";
import Share from "@/app/components/layout/common/Share";
import Modal from "@/app/components/layout/common/Modal";
import DonationList from "@/app/components/layout/common/DonationList.client";

type DogInfoProps = {
  dog: Dog | undefined
  account?: Account;
}

const DogInfo: React.FunctionComponent<DogInfoProps> = ({ dog, account }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDonations, setShowDonations] = useState<boolean>(false);

  const sponsorsText = useMemo(() => {
    if (dog) {
      if (dog?.donations.length === 1) {
        return dog?.donations.length + " sponsor"
      }
      else {
        return dog?.donations.length + " sponsors"
      }
    }
  }, [dog])

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Hello, I'm <strong>{dog?.name}</strong></h1>
        {dog && <Share isOpen={isOpen} setIsOpen={setIsOpen} type={"dog"} id={dog?.id} name={dog?.name} />}
      </div>

      <div className="flex items-center gap-x-1 mt-1 text-zinc-500 mb-4">
        <IconPin /> Location
      </div>

      <div className="text-zinc-900 mb-5">{dog?.description}</div>

      {dog && dog?.donations.length > 0 ?
        sponsorsText &&
        <StackedAvatars text={sponsorsText} onClick={() => setShowDonations(true)} /> :
        <div className="text-sm text-zinc-500">No sponsors yet. Be the first ❤️</div>
      }


      <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-6 mb-6">
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

      <ButtonLink
        text={"Sponsor Me!"}
        classNames="my-5"
        url={`/dogs/${dog?.id}/sponsor`}
        fullWidth={true}
      />

      <div className="flex gap-x-2 justify-center text-zinc-500 text-sm mt-5">
        <IconHeart className="w-4 w-5" />Add to favorites
      </div>

      <Modal setIsOpen={setShowDonations} isOpen={showDonations} title={"Sponsors"}>
        {dog?.donations.map((donation) => (
          <DonationList donation={donation} />
        ))}
      </Modal>
    </>
  )
}

export default DogInfo;