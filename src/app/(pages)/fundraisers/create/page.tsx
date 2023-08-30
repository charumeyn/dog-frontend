"use client"

import Container, { ContainerType } from "@/app/components/layout/Container"
import FundraiserCreateContent from "@/app/feature/fundraisers/FundraiserCreateContent"

export default function CreateFundRaiser() {

  return (
    <Container
      type={ContainerType.SingleColumn}
      withBg
      mainContent={<FundraiserCreateContent />}
    />
  )


}