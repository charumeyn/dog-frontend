import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import FundraiserListContent from "@/app/feature/fundraisers/FundraiserListContent";
import React from "react";

export default function FundraiserList() {

  return (
    <div>
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <div className="pt-20 pb-10">
            <Heading type={"h1"} text={"Fundraisers you can support"} className="text-3xl font-bold mb-3" />
            <p className="text-zinc-500">Dogs in shelters and low-income homes needs your help!</p>
          </div>
        } />

      <FundraiserListContent />
    </div>
  );
}