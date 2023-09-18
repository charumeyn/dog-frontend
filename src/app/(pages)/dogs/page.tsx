"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import DogListContent from "@/app/feature/dogs/DogList";
import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import React from "react";

export default function DogList() {

  const { data: account } = useAccount()

  return (
    <div>
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <div className="pt-20 pb-10 flex justify-between items-end">
            <div>
              <Heading type={"h1"} text={"Dogs you can sponsor"} className="text-3xl font-bold mb-3" />
              <p className="text-zinc-500">Dogs from around the world needs your sponsoring, please help when you can!</p>
            </div>
            {account?.type === UserType.Shelter ?
              <a className="text-teal-600 font-medium" href="/account/dogs/register">+ Register a Dog</a>
              : null}
          </div>
        } />

      <DogListContent />
    </div>
  );
}