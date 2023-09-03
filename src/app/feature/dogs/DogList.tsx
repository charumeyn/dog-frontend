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
import { IconChevronLeft, IconChevronRight } from "@/app/components/layout/Icons";


export default function DogListContent() {
  const [limit, setLimit] = useState<number>(4);
  const [offset, setOffset] = useState<number>(1);
  const [gender, setGender] = useState<Gender | undefined>()
  const [size, setSize] = useState<Size | undefined>()
  const [color, setColor] = useState<Color | undefined>()
  const [coatLength, setCoatLength] = useState<CoatLength | undefined>()

  const { data: dogs, isLoading, isFetching, error } = useDogs(limit, offset, gender, size, color, coatLength);

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
            <>
              <div>
                <div className="grid grid-cols-4 gap-4">
                  {dogs.map((dog, i) => (
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
          <div className="flex justify-center gap-5 border-t border-zinc-200 py-8">
            <a onClick={() => setOffset(offset - limit)}
              className={`${offset === 1 ? "pointer-events-none	opacity-50" : ""} flex items-center gap-x-2 border border-zinc-200 rounded-full px-4 py-2 text-sm hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:cursor-pointer`}>
              <IconChevronLeft className="w-4 h-4" />Previous
            </a>
            <a onClick={() => setOffset(offset + limit)}
              className={`${dogs?.length === 0 ? "pointer-events-none	opacity-50" : ""} flex items-center gap-x-2 border border-zinc-200 rounded-full px-4 py-2 text-sm hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:cursor-pointer`}>
              Next<IconChevronRight className="w-4 h-4" />
            </a>
          </div>
        }
      />
    </>
  )
}
