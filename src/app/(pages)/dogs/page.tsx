import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import DogListContent from "@/app/feature/dogs/DogList";
import React from "react";

export default function ListDogs() {


  return (
    <div>
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <div className="pt-20 pb-10">
            <Heading type={"h1"} text={"Dogs you can sponsor"} className="text-3xl font-bold mb-3" />
            <p className="text-zinc-500">Dogs from around the world needs your sponsoring, please help when you can!</p>
          </div>
        } />

      <DogListContent />
    </div>
  );
}