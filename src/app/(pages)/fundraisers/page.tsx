"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import FundraiserListContent from "@/app/feature/fundraisers/FundraiserListContent";
import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import React from "react";

export default function FundraiserList() {

  const { data: account } = useAccount()

  return (
    <div>
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <div className="pt-20 pb-10 flex justify-between items-end">
            <div>
              <Heading type={"h1"} text={"Fundraisers you can support"} className="text-3xl font-bold mb-3" />
              <p className="text-zinc-500">Dogs in shelters and low-income homes needs your help!</p>
            </div>
            {account?.type === UserType.Shelter || account?.type === UserType.User ?
              <a className="text-teal-600 font-medium" href="/fundraisers/create">+ Create a Fundraiser</a>
              : null}
          </div>
        } />

      <FundraiserListContent />
    </div>
  );
}