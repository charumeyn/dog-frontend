import { IconHorizontalDots } from "@/app/components/layout/Icons";
import DonationList from "@/app/components/layout/common/DonationList.client";
import DropdownMenu from "@/app/components/layout/common/DropdownMenu";
import Heading from "@/app/components/layout/common/Heading";
import Modal from "@/app/components/layout/common/Modal";
import { useDog } from "@/app/hooks/api/useDogs";
import { useShelter } from "@/app/hooks/api/useShelters";
import { User } from "@/app/types/user.interface";
import moment from "moment";
import { useMemo, useState } from "react";

export default function ShelterDogsContent({ account }: { account: User }) {

  const { data: shelter } = useShelter(account.shelter.id)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="Dogs in Shelter" />
        <a href={`/account/register-dog?shelterId=${account.shelter.id}`} className="text-teal-600 font-semibold text-sm">+ Register a dog</a>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {shelter?.dogs?.map((dog, i) => (
          <DogCard key={i} dogId={dog.id} />
        ))}
      </div>
    </div>
  )
}


function DogCard({ dogId }: { dogId: number }) {

  const [showDonations, setShowDonations] = useState<boolean>(false);

  const { data: dog } = useDog(dogId)

  const menu = useMemo(() => {
    if (dog) {
      return [
        { label: "Edit", url: `/account/dogs/${dog.id}` },
        { label: "View", url: `/dogs/${dog.id}` },
      ];
    }
  }, [dog])


  return (
    dog ?
      <div>
        <div className="flex gap-5 border border-zinc-200 rounded-xl p-5">
          <img src={dog.mainImage} className="w-14 h-14 rounded-full" />
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <span className="font-bold text-lg"><a href={`/dogs/${dog.id}`}>{dog.name}</a></span>
                <span className="text-sm text-zinc-500 pl-2">({moment(dog.birthdate).format("YYYY-MM-DD")})</span>
              </div>
              {menu ?
                <DropdownMenu
                  menuItems={menu}
                  icon={
                    <IconHorizontalDots
                      className="h-8 w-8 bg-gray-200 p-1.5 rounded-full"
                      aria-hidden="true"
                    />
                  }
                /> : null}
            </div>
            <p className="text-sm mb-3">
              <span className="text-teal-600 font-medium hover:cursor-pointer" onClick={() => setShowDonations(true)}>{dog.donations.length} donations</span>
              <span className="text-zinc-300 pl-2 pr-2">•</span>
              <span className="text-teal-600 font-medium hover:cursor-pointer">{dog.comments.length} comments</span>
            </p>
            <div className="flex text-sm mb-1">
              <div className="w-24 text-zinc-500">Breed</div>
              <div>{dog.breed}</div>
            </div>
            <div className="flex text-sm mb-1">
              <div className="w-24 text-zinc-500">Color</div>
              <div>{dog.color}</div>
            </div>
            <div className="flex text-sm mb-1">
              <div className="w-24 text-zinc-500">Birthdate</div>
              <div>{moment(dog.birthdate).format("LL")}</div>
            </div>
            <div className="flex text-sm mb-1">
              <div className="w-24 text-zinc-500">Gender</div>
              <div>{dog.gender}</div>
            </div>
          </div>
        </div>
        <Modal setIsOpen={setShowDonations} isOpen={showDonations} title={"Donations"}>
          {dog.donations.map((donation, i) => (
            <DonationList key={i} donation={donation} />
          ))}
        </Modal>
      </div >
      : null
  )
}
