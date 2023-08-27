import DashboardStats from "@/app/components/layout/common/DashboardStats";
import Heading from "@/app/components/layout/common/Heading";
import { User } from "@/app/types/user.interface";
import { useState } from "react";

export default function ShelterEditContent({ account }: { account: User }) {

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [images, setImages] = useState<string>("")
  const [mainImage, setMainImage] = useState<string>("")

  return (
    <div>

    </div>
  )
}


function SponsorshipList() {
  return (
    <div>
      <Heading type={"h2"} text={"Latest Sponsorships"} />

    </div>
  )
}

function DonationList() {
  return (
    <div>
      <Heading type={"h2"} text={"Latest Donations"} />


    </div>
  )
}

