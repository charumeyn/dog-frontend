"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import ImageGallery from "@/app/components/layout/common/ImageGallery";
import CommentList from "@/app/feature/comment/CommentItem.client";
import FundraiserInfo from "@/app/feature/fundraisers/FundraiserInfo";
import FundraiserList from "@/app/feature/fundraisers/FundraiserList";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useFundraiser, useFundraisers } from "@/app/hooks/api/useFundraisers";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import { useMemo } from "react";


export default function Fundraiser({ params }: { params: any }) {

  const id = Number(params.id);

  const { data: fundraiser, isLoading: isLoadingFundraiser } = useFundraiser(id);
  const { data: fundraisers, isLoading: isLoadingFundraisers } = useFundraisers(4);
  const { data: account } = useAccount();

  const image = useMemo(() => {
    if (fundraiser) {
      if (fundraiser?.shelter) {
        return fundraiser.shelter.mainImage
      } else {
        return fundraiser.createdByUser.image
      }
    }
  }, [fundraiser])

  const name = useMemo(() => {
    if (fundraiser) {
      if (fundraiser?.shelter) {
        return fundraiser.shelter.name
      } else {
        return fundraiser.createdByUser.firstName + " " + fundraiser.createdByUser.lastName
      }
    }
  }, [fundraiser])

  const isByShelter: boolean = useMemo(() => {
    return !!fundraiser?.shelter
  }, [fundraiser])

  return (
    <main>
      <Container
        type={ContainerType.ImageWithContent}
        className="mt-16"
        imageContent={
          fundraiser ?
            <ImageGallery images={fundraiser?.images} mainImage={fundraiser?.mainImage} /> : null
        }
        mainContent={
          <div className="bg-white rounded-xl py-8 px-8 border border-zinc-300">
            <FundraiserInfo fundraiser={fundraiser} account={account} />
          </div>
        }
      />

      <Container
        type={ContainerType.FlushLeft}
        className="mb-10 mt-10"
        mainContent={
          fundraiser ?
            <div>
              <div className="border border-zinc-200 rounded-lg px-5 py-5 mb-8">
                <p className="text-sm">{fundraiser?.description}</p>
              </div>
              <p className="font-medium mb-2">Initiated by</p>
              <div className="flex items-center justify-between pb-8 border-b border-zinc-200">
                <div className="flex items-center gap-x-4">
                  <img src={image} className="w-14 h-14 rounded-full" />
                  <p>{name}</p>
                </div>
                <div>
                  {isByShelter ?
                    <a href={""} className="font-medium px-8 py-3 border border-zinc-300 rounded-full">Visit ➞</a> : null}
                </div>
              </div>
            </div> : null
        }
      />


      <Container
        type={ContainerType.FlushLeft}
        className=""
        mainContent={
          fundraiser ?
            <>
              <p className="font-medium mb-2">Comments from donors</p>
              <CommentList comments={fundraiser?.comments} />
            </> : null
        }
      />

      <Container
        type={ContainerType.SingleColumn}
        className="bg-zinc-100 pt-12 pb-16 mt-16"
        mainContent={
          <>
            <Heading type="h1" text="Help other fundraisers" className="mb-8 text-center" />
            <FundraiserList currentFundraiser={fundraiser} />
          </>
        }
      />

    </main>
  )
}