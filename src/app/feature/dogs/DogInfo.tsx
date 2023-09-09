"use client";

import { IconDog, IconHeart, IconHome, IconPin, IconShare } from "@/app/components/layout/Icons";
import StackedAvatars from "@/app/components/layout/common/StackedAvatars";
import { Account } from "@/app/types/account.interface";
import { Dog } from "@/app/types/dog.interface"
import moment from "moment";
import { useMemo, useState } from "react";
import ButtonLink from "@/app/components/layout/common/ButtonLink";
import Share from "@/app/components/layout/common/Share";
import Modal from "@/app/components/layout/common/Modal";
import { DonationRow } from "@/app/components/layout/common/DonationList.client";
import { User } from "@/app/types/user.interface";
import AddToFavorites from "./AddToFavorites";

type DogInfoProps = {
  dog?: Dog;
  account?: User;
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
        {dog && <Share isOpen={isOpen} setIsOpen={setIsOpen} type={"dog"} id={dog?.id} name={dog?.name} isButton={false} />}
      </div>

      <div className="text-zinc-900 mb-5 mt-2">{dog?.description}</div>

      {dog && dog?.donations.length > 0 ?
        sponsorsText &&
        <StackedAvatars
          donations={dog?.donations}
          text={sponsorsText}
          onClick={() => setShowDonations(true)}
        /> :
        <div className="text-sm text-zinc-500">No sponsors yet. Be the first ❤️</div>
      }


      <div className="grid grid-cols-2 gap-x-10 gap-y-3 mt-6 mb-2">

        <div className="col-span-2">
          <p className="text-zinc-500 text-sm">Breed</p>
          <p className="text-lg font-bold">{dog?.breed.join(", ")}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">Age</p>
          <p className="text-lg font-bold">{moment(dog?.birthdate).fromNow(true)}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">Gender</p>
          <p className="text-lg font-bold capitalize">{dog?.gender}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">Size</p>
          <p className="text-lg font-bold capitalize">{dog?.size}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">Coat Length</p>
          <p className="text-lg font-bold capitalize">{dog?.coatLength}</p>
        </div>
      </div >

      <ButtonLink
        text={"Sponsor Me!"}
        classNames="my-5"
        url={`/dogs/${dog?.id}/sponsor`}
        fullWidth={true}
      />

      {account && dog ? <AddToFavorites account={account} dogId={dog.id} /> : null}

      <Modal setIsOpen={setShowDonations} isOpen={showDonations} title={"Sponsors"}>
        {dog?.donations.map((donation, i) => (
          <DonationRow key={i} id={donation.id} />
        ))}
      </Modal>
    </>
  )
}

export default DogInfo;