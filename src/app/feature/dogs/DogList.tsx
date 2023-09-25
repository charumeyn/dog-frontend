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
import Pagination from "@/app/components/layout/common/Pagination";
import SlideOver from "@/app/components/layout/common/SlideOver";
import { DogCardSkeleton } from "@/app/components/layout/common/CardSkeleton";


export default function DogListContent() {
  const [limit, setLimit] = useState<number>(12);
  const [offset, setOffset] = useState<number>(1);
  const [gender, setGender] = useState<Gender | undefined>()
  const [size, setSize] = useState<Size | undefined>()
  const [color, setColor] = useState<Color | undefined>()
  const [coatLength, setCoatLength] = useState<CoatLength | undefined>()
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)

  const { data: dogs, isLoading } = useDogs(limit, offset, gender, size, color, coatLength);

  return (
    <>
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <>
            <SelectedFilters
              limit={limit}
              setLimit={setLimit}
              gender={gender} setGender={setGender}
              size={size} setSize={setSize}
              coatLength={coatLength} setCoatLength={setCoatLength}
              color={color} setColor={setColor}
              isOpenFilter={isOpenFilter} setIsOpenFilter={setIsOpenFilter}
            />
          </>
        }
      />
      <Container
        type={ContainerType.LeftSidebar}
        sidebarContent={
          <>
            <div className="hidden lg:block">
              <Filter
                gender={gender} setGender={setGender}
                size={size} setSize={setSize}
                coatLength={coatLength} setCoatLength={setCoatLength}
                color={color} setColor={setColor} />
            </div>
            <SlideOver
              isOpen={isOpenFilter}
              setIsOpen={setIsOpenFilter}
              title={"Filters"}
              children={
                <Filter
                  gender={gender} setGender={setGender}
                  size={size} setSize={setSize}
                  coatLength={coatLength} setCoatLength={setCoatLength}
                  color={color} setColor={setColor} />
              }
            />
          </>
        }
        mainContent={
          dogs ?
            <>
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
                  {isLoading ?
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) =>
                      <DogCardSkeleton key={x} />
                    ) :
                    dogs.map((dog, i) => (
                      <DogCard key={i} dog={dog} />
                    ))}
                </div>
              </div>
              {dogs.length <= 0 ?
                <div className="bg-zinc-100 py-14 text-center rounded-lg">No dogs found.</div> : null}
            </>
            : null
        }
      />
      <Container
        type={ContainerType.LeftSidebar}
        sidebarContent={
          null
        }
        mainContent={
          dogs ?
            <Pagination offset={offset} setOffset={setOffset} limit={limit} currentLength={dogs?.length} />
            : null
        }
      />
    </>
  )
}
