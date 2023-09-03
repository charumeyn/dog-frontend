"use client"

import { useDogs } from "@/app/hooks/api/useDogs";
import SelectedFilters from "./SelectedFilters";
import Container, { ContainerType } from "@/app/components/layout/Container";
import Filter from "./Filter";
import { useState } from "react";
import DogCard from "@/app/components/layout/common/DogCard";
import { Size } from "@/app/types/enum/size.enum";
import { Color } from "@/app/types/enum/color.enum";
import { Gender } from "@/app/types/enum/gender.enum";
import { CoatLength } from "@/app/types/enum/coatLength.enum";


export default function DogListContent() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [gender, setGender] = useState<Gender | undefined>()
  const [size, setSize] = useState<Size | undefined>()
  const [color, setColor] = useState<Color | undefined>()
  const [coatLength, setCoatLength] = useState<CoatLength | undefined>()

  const { data: dogs, isLoading, isFetching, error } = useDogs(limit, gender, size, color, coatLength);

  return (
    <>
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <SelectedFilters
            limit={limit}
            setLimit={setLimit}
            gender={gender} setGender={setGender}
            size={size} setSize={setSize}
            coatLength={coatLength} setCoatLength={setCoatLength}
            color={color} setColor={setColor}
          />
        }
      />
      <Container
        type={ContainerType.LeftSidebar}
        sidebarContent={
          <Filter
            gender={gender} setGender={setGender}
            size={size} setSize={setSize}
            coatLength={coatLength} setCoatLength={setCoatLength}
            color={color} setColor={setColor}
          />
        }
        mainContent={
          dogs ?
            <div>
              <div className="grid grid-cols-4 gap-4">
                {dogs.map((dog, i) => (
                  <DogCard key={i} dog={dog} />
                ))}
              </div>
            </div>
            : null
        }
      />
    </>
  )
}
