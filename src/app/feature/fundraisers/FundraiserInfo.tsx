import ButtonLink from "@/app/components/layout/common/ButtonLink"
import { DonationRow } from "@/app/components/layout/common/DonationList.client"
import Modal from "@/app/components/layout/common/Modal"
import ProgressBar from "@/app/components/layout/common/ProgressBar"
import Share from "@/app/components/layout/common/Share"
import StackedAvatars from "@/app/components/layout/common/StackedAvatars"
import { Account } from "@/app/types/account.interface"
import { Fundraiser } from "@/app/types/fundraiser.interface"
import { User, UserType } from "@/app/types/user.interface"
import { useMemo, useState } from "react"

type FundraiserInfoProps = {
  fundraiser?: Fundraiser;
  account?: User;
}

const FundraiserInfo: React.FunctionComponent<FundraiserInfoProps> = ({ fundraiser, account }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDonations, setShowDonations] = useState<boolean>(false);

  const donationsText = useMemo(() => {
    if (fundraiser) {
      if (fundraiser?.donations.length === 1) {
        return fundraiser?.donations.length + " donation"
      }
      else {
        return fundraiser?.donations.length + " donations"
      }
    }
  }, [fundraiser])

  const totalDonations = useMemo(() => {
    if (fundraiser && fundraiser?.donations.length > 0) {
      return fundraiser?.donations.reduce((total, thing) => total + thing.amount, 0);
    } else return 0
  }, [fundraiser])

  const sponsorsText = useMemo(() => {
    if (fundraiser) {
      if (fundraiser?.donations.length === 1) {
        return fundraiser?.donations.length + " sponsor"
      }
      else {
        return fundraiser?.donations.length + " sponsors"
      }
    }
  }, [fundraiser])

  const recipientId = useMemo(() => {
    if (fundraiser?.dog != null) {
      return fundraiser?.dog.id
    } else if (fundraiser?.shelter != null) {
      return fundraiser?.shelter.id
    } else if (fundraiser?.user != null) {
      return fundraiser?.user.id
    }
  }, [fundraiser])

  return (
    <>
      <h1 className="text-xl md:text-2xl font-medium mb-2">{fundraiser?.title}</h1>

      <div className="text-zinc-900 mb-5">{fundraiser?.description}</div>

      {fundraiser ?
        <ProgressBar fundraiser={fundraiser} classNames="mt-5 mb-5" /> : null}

      {account?.type === UserType.User ?
        <ButtonLink
          text={"Donate"}
          color={"text-white bg-orange-600 hover:bg-orange-700"}
          classNames="my-3"
          url={`/fundraisers/${fundraiser?.id}/donate?recipientId=${recipientId}`}
          fullWidth={true}
        /> : account?.type === UserType.Shelter ?
          <ButtonLink
            text={"Donate"}
            classNames="mt-5 hover:cursor-default pointer-events-none	"
            color="text-white bg-zinc-300 hover:bg-zinc-300"
            url={`#`}
            fullWidth={true}
          /> :
          <ButtonLink
            text={"Donate"}
            classNames="my-5"
            url={`/login`}
            fullWidth={true}
          />
      }

      {account?.type === UserType.Shelter ? <div className="text-zinc-400 text-center text-sm mt-1 mb-3">Shelter accounts cannot donate</div> : null}

      <div className="flex gap-x-2 justify-center text-zinc-500 text-sm mb-8">
        {fundraiser ?
          <Share isOpen={isOpen} setIsOpen={setIsOpen} type={"fundraiser"} id={fundraiser?.id} name={fundraiser?.title} isButton={true} /> :
          null}
      </div>

      {fundraiser && fundraiser?.donations.length > 0 ?
        donationsText &&
        <StackedAvatars
          donations={fundraiser?.donations}
          text={donationsText}
          onClick={() => setShowDonations(true)} /> :
        <div className="text-sm text-zinc-500">No donations yet. Be the first ❤️</div>
      }

      <Modal setIsOpen={setShowDonations} isOpen={showDonations} title={"Sponsors"}>
        {fundraiser?.donations.map((donation, i) => (
          <DonationRow key={i} id={donation.id} />
        ))}
      </Modal>

    </>
  )
}

export default FundraiserInfo;