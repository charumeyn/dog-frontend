"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import ImageGallery from "@/app/components/layout/common/ImageGallery";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useDog, useDogs } from "@/app/hooks/api/useDogs";
import DogInfo from "./DogInfo";
import Heading from "@/app/components/layout/common/Heading";
import CommentList from "../comment/CommentItem.client";
import PostCard from "@/app/components/layout/common/PostCard";
import Grid from "@/app/components/layout/common/Grid";
import DogCard from "@/app/components/layout/common/DogCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DogCardSkeleton } from "@/app/components/layout/common/CardSkeleton";

export default function DogDetailContent({ id }: { id: number }) {

  const { data: dog, isLoading: isLoadingDog } = useDog(id);
  const { data: dogs, isLoading: isLoadingDogs } = useDogs(4);
  const { data: account } = useAccount();
  const router = useRouter()

  useEffect(() => {
    if (!isLoadingDog) {
      if (dog?.user != null) {
        setTimeout(() => {
          router.push("/")
        }, 3000);
      }
    }
  }, [dog])


  return (
    isLoadingDog ?
      <DogDetailContentSkeleton /> :
      dog ?
        dog.user != null ?
          <Container
            type={ContainerType.NarrowColumn}
            className="py-16"
            mainContent={
              <div className="text-center">
                <p className="mb-3">Only dogs from shelter can be sponsored.</p>
                <p>Redirecting you to home page... or click <a className="text-teal-600" href="/">here</a>.</p>
              </div>
            }
          /> :
          <main>
            <Container
              type={ContainerType.ImageWithContent}
              className="mt-16"
              imageContent={
                dog ?
                  <ImageGallery images={dog?.images} mainImage={dog?.mainImage} /> : null
              }
              mainContent={
                <div className="bg-white rounded-xl p-4 md:p-8 border border-zinc-300">
                  <DogInfo dog={dog} account={account} />
                </div>
              }
            />

            <Container
              type={ContainerType.FlushLeft}
              className="mb-10 mt-10"
              mainContent={
                dog ?
                  <div>
                    <p className="mb-2 text-zinc-500 text-sm">Created by {dog?.shelter.name}</p>
                    <div className="border border-zinc-200 rounded-lg px-5 py-5 mb-8">
                      <p className="text-sm leading-relaxed">{dog?.content}</p>
                    </div>
                    <p className="font-medium mb-2">Initiated By</p>
                    <div className="flex items-center justify-between pb-8 border-b border-zinc-200">
                      <div className="flex items-center gap-x-6">
                        <img src={dog?.shelter.mainImage} className="w-20 h-20 rounded-full" />
                        <div>
                          <h3 className="font-bold">{dog?.shelter.name}</h3>
                        </div>
                      </div>
                      <div>
                        <a href={`/shelters/${dog.shelter.id}`} className="font-medium px-8 py-3 border border-zinc-300 rounded-full">Visit ➞</a>
                      </div>
                    </div>
                  </div> : null
              }
            />

            <Container
              type={ContainerType.FlushLeft}
              className=""
              mainContent={
                dog ?
                  <>
                    <p className="font-medium mb-2">Comments from sponsors</p>
                    <CommentList comments={dog?.comments} />
                  </> : null
              }
            />

            <Container
              type={ContainerType.SingleColumn}
              withBg
              className="pt-12 pb-16 mt-16"
              mainContent={
                account && dog?.posts && dog?.posts.length > 0 ?
                  <>
                    <Heading type="h1" text={`${dog?.name}'s Doggo Diary`} className="mb-5" />
                    <div className="grid grid-cols-3 gap-1 md:grid-cols-5 md:gap-2">
                      {dog?.posts.map((post, i) =>
                        <PostCard key={i} id={post.id} dog={dog} />
                      )}
                    </div>
                  </> : null
              }
            />

            <Container
              type={ContainerType.SingleColumn}
              className="py-16"
              mainContent={
                <>
                  <Heading type={"h1"} text={"Meet other dogs"} className="text-center mb-10" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {isLoadingDogs ?
                      [1, 2, 3, 4]?.map((x) =>
                        <DogCardSkeleton key={x} />
                      ) :
                      dogs?.map((dog, i) =>
                        <DogCard key={i} dog={dog} />
                      )}
                  </div>
                  <a className="mt-10 block table font-medium mx-auto px-8 py-3 border border-zinc-300 rounded-full" href={`/dogs/`}>View all dogs</a>
                </>
              }
            />
          </main>
        : null

  )
}

function DogDetailContentSkeleton() {
  return (
    <Container
      type={ContainerType.ImageWithContent}
      className="mt-16"
      imageContent={
        <div className="grid grid-cols-8 gap-4 animate-pulse">
          <div className="col-span-1">
            <div className="bg-zinc-200 w-full h-20 mb-2"></div>
            <div className="bg-zinc-200 w-full h-20 mb-2"></div>
          </div>
          <div className="col-span-7">
            <div className="bg-zinc-200 w-full h-[500px] mb-2"></div>
          </div>
        </div>
      }
      mainContent={
        <div className="animate-pulse bg-white rounded-xl py-8 px-8 border border-zinc-300">
          <div className="bg-zinc-200 w-full h-8 mb-2"></div>
          <div className="bg-zinc-200 w-60 h-8 mb-2"></div>
          <div className="bg-zinc-200 w-full h-14 mt-6"></div>
          <div className="bg-zinc-200 w-full h-48 mb-6 mt-6"></div>
          <div className="bg-zinc-200 w-full h-12"></div>
        </div>
      }
    />
  )
}
