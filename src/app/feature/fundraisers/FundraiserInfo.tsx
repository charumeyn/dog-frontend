import ButtonLink from "@/app/components/layout/common/ButtonLink"
import DonationList from "@/app/components/layout/common/DonationList.client"
import Modal from "@/app/components/layout/common/Modal"
import ProgressBar from "@/app/components/layout/common/ProgressBar"
import Share from "@/app/components/layout/common/Share"
import StackedAvatars from "@/app/components/layout/common/StackedAvatars"
import { Account } from "@/app/types/account.interface"
import { Fundraiser } from "@/app/types/fundraiser.interface"
import { useMemo, useState } from "react"

type FundraiserInfoProps = {
  fundraiser?: Fundraiser;
  account?: Account;
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

  return (
    <>
      <h1 className="text-2xl font-medium mb-5">{fundraiser?.title}</h1>

      <div className="text-zinc-900 mb-5">{fundraiser?.description}</div>

      {fundraiser ?
        <ProgressBar fundraiser={fundraiser} classNames="mt-5 mb-5" /> : null}

      <ButtonLink
        text={"Donate"}
        color={"text-white bg-orange-600 hover:bg-orange-700"}
        classNames="my-5"
        url={`/fundraiser/${fundraiser?.id}/donate`}
        fullWidth={true}
      />

      <div className="flex gap-x-2 justify-center text-zinc-500 text-sm mt-3 mb-8">
        {fundraiser ?
          <Share isOpen={isOpen} setIsOpen={setIsOpen} type={"fundraiser"} id={fundraiser?.id} name={fundraiser?.title} isButton={true} /> :
          null}
      </div>

      {fundraiser && fundraiser?.donations.length > 0 ?
        donationsText &&
        <StackedAvatars text={donationsText} onClick={() => setShowDonations(true)} /> :
        <div className="text-sm text-zinc-500">No donations yet. Be the first ❤️</div>
      }

      <Modal setIsOpen={setShowDonations} isOpen={showDonations} title={"Sponsors"}>
        {fundraiser?.donations.map((donation, i) => (
          <DonationList key={i} donation={donation} />
        ))}
      </Modal>

    </>
  )
}

export default FundraiserInfo;