import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import RegisterShelterDetailsContent from "@/app/feature/account/RegisterShelterDetailsContent";
import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import { useMemo } from "react";

export default function RegisterShelter({ searchParams }: { searchParams: any }) {


  return (
    <Container
      type={ContainerType.NarrowColumn}
      className="pt-20 pb-20"
      withBg
      mainContent={
        <div>
          <Heading type={"h1"} text={"Register a Shelter Account"} className="font-bold mb-8 text-center" />
          <div className="grid grid-cols-2 gap-x-4 max-w-2xl mx-auto mb-8 px-20">
            <div className="flex gap-x-2 items-center">
              <span className="bg-zinc-300 flex items-center justify-center text-white font-medium rounded-full w-8 h-8">
                1
              </span>
              <h2 className="text-zinc-400 font-medium">User Account</h2>
            </div>
            <div className="flex gap-x-2 items-center">
              <span className="bg-teal-600 flex items-center justify-center text-white font-medium rounded-full w-8 h-8">
                2
              </span>
              <h2 className="text-teal-600 font-medium">Shelter Details</h2>
            </div>
          </div>
          <RegisterShelterDetailsContent userId={Number(searchParams.userId)} />
        </div>
      } />
  )
}

