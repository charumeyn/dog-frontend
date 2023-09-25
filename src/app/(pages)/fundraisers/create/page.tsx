"use client"

import Container, { ContainerType } from "@/app/components/layout/Container"
import FundraiserCreateContent from "@/app/feature/fundraisers/FundraiserCreateContent"

export default function CreateFundRaiser({ searchParams }: { searchParams: any }) {

  return (
    <Container
      type={ContainerType.SingleColumn}
      withBg
      mainContent={<FundraiserCreateContent searchParams={searchParams} />}
    />
  )
}