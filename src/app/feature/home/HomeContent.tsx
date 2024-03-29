"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import DogCard from "@/app/components/layout/common/DogCard";
import Heading from "@/app/components/layout/common/Heading";
import PostCard from "@/app/components/layout/common/PostCard";
import { useDogs } from "@/app/hooks/api/useDogs";
import { useFundraisers } from "@/app/hooks/api/useFundraisers";
import { usePosts } from "@/app/hooks/api/usePosts";
import { Dog } from "@/app/types/dog.interface";
import { Post } from "@/app/types/post.interface";
import FundraiserCard from "../fundraisers/FundraiserCard";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import BorderLink from "@/app/components/layout/common/BorderLink";
import { useEffect, useState } from "react";
import { IconChevronRight } from "@/app/components/layout/Icons";
import HomeStats from "./HomeStats";
import { DogCardSkeleton, FundraiserCardSkeleton, PostCardSkeleton } from "@/app/components/layout/common/CardSkeleton";

export default function HomeContent() {

  const { data: dogs, isLoading: isLoadingDogs } = useDogs(10);
  const { data: posts, isLoading: isLoadingPosts } = usePosts(6);
  const { data: fundraisers, isLoading: isLoadingFundraisers } = useFundraisers(4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const text = [
    'Happily',
    'Comfortably',
    'Freely',
    'Worry-free',
    'Greatly',
    'Cheerfully',
    'Blissfully',
  ];


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === text.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1500);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <main>
      <section className="bg-[#FFF4DA] py-5">
        <div className="flex flex-col-reverse lg:flex-row justify-between w-full max-w-lg lg:max-w-screen-xl mx-auto px-4">
          <div className="py-14 md:py-24 text-center md:text-left">
            <div className="text-xl md:text-3xl font-bold mb-2">
              Let's help dogs live
            </div>
            <div className="text-4xl md:text-6xl font-extrabold">
              {text[currentIndex]}
            </div>
            <p className="mt-10 font-medium text-zinc-600">You have to power to improve lives of dogs in shelters. <br className="hidden md:inline-block" />Every single donation will be spent to care for these dogs.</p>
            <div className="text-3xl font-bold mb-2"></div>
            <a href="#" className="inline-block mt-10 bg-teal-600 text-white text-lg pl-6 pr-3 py-3 rounded-full">
              <span className="flex items-center gap-x-2">Learn more <IconChevronRight /></span>
            </a>
          </div>
          <div className="pt-10">
            <img className="w-full mx-auto max-w-md lg:max-w-full" src="https://doggoslife.s3.ap-northeast-2.amazonaws.com/doggos-life-mainimage.png" />
          </div>
        </div>
      </section>

      <section className="pt-14 pb-14 bg-zinc-100 border-t-2 border-white">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="grid grid-cols-4">
            <div className="col-span-4 lg:col-span-1">
              <p className="lg:pt-12 text-xl font-medium text-zinc-500 mb-6 lg:mb-0 text-center lg:text-left">Thanks to you, <br /> we currently have:</p>
            </div>
            <div className="col-span-4 lg:col-span-3">
              <HomeStats />
            </div>
          </div>
        </div>
      </section>

      <Container
        type={ContainerType.SingleColumn}
        className="py-14 md:py-24"
        mainContent={
          <div>
            <Heading type={"h1"} text={"Meet The Dogs"} className="text-2xl md:!text-3xl md:text-center mb-2" />
            <p className="md:text-center mb-10 text-zinc-500 md:font-medium text-sm md:text-base">These dogs are all living in a shelter, <br className="block md:hidden" />and they need your help.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {isLoadingDogs ?
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((x) =>
                  <DogCardSkeleton key={x} />
                ) :
                dogs?.map((dog: Dog, i: number) =>
                  <DogCard key={i} dog={dog} />
                )
              }
            </div>
            <BorderLink url={"/dogs/"} text={"View all dogs"} withArrow={true} containerClasses="mt-14 text-center" />
          </div>
        }
      />

      <section className="bg-zinc-100">
        <hr className="max-w-screen-2xl mx-auto" />
      </section>

      <Container
        type={ContainerType.SingleColumn}
        className="pt-14 pb-20 "
        mainContent={
          <div>
            <div className="flex justify-between items-start">
              <div>
                <Heading type={"h1"} text={"The Doggo Diaries"} className="text-2xl md:!text-3xl mb-2" />
                <p className="mb-10 text-zinc-500 md:font-medium text-sm md:text-base">Life updates of our dogs!</p>
              </div>
              <BorderLink url={"/posts/"} text={"View all posts"} withArrow={true} containerClasses="text-center hidden md:inline-block" />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-2">
              {isLoadingPosts ?
                [1, 2, 3, 4, 5, 6].map((x) =>
                  <PostCardSkeleton key={x} />
                ) :
                posts?.map((post: Post, i: number) =>
                  <PostCard key={i} id={post.id} dog={post.dog} />
                )}
            </div>
            <BorderLink url={"/posts/"} text={"View all posts"} withArrow={true} containerClasses="mt-14 text-center md:hidden" />
          </div>
        }
      />

      <Container
        type={ContainerType.SingleColumn}
        className="py-14 md:py-24 bg-zinc-100"
        mainContent={
          <div>
            <Heading type={"h1"} text={"Featured Fundraisers"} className="text-2xl md:!text-3xl md:text-center mb-2" />
            <p className="md:text-center mb-10 text-zinc-500 md:font-medium text-sm md:text-base">Fundraisers that are opened by our <br className="block md:hidden" />community to help dogs around the world.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6">
              {isLoadingFundraisers ?
                [1, 2, 3, 4].map((x) =>
                  <FundraiserCardSkeleton key={x} />
                ) :
                fundraisers?.map((fundraiser: Fundraiser, i: number) =>
                  <FundraiserCard key={i} fundraiser={fundraiser} containerClasses="p-3.5 md:p-5 bg-white rounded-lg" />
                )}
            </div>
            <BorderLink url={"/fundraisers/"} text={"View all fundraisers"} withArrow={true} containerClasses="mt-14 text-center" />
          </div>
        }
      />

      <Container
        type={ContainerType.SingleColumn}
        className="py-14 md:py-24 "
        mainContent={
          <div>
            <Heading type={"h1"} text={"Open your fundraiser"} className="text-2xl md:!text-3xl text-center mb-2" />
            <p className="text-center mb-10 text-zinc-500 md:font-medium text-sm md:text-base">Let our community help you with your cause <br className="block md:hidden" />and open a fundraiser for:</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-6 max-w-xs sm:max-w-screen-lg mx-auto">

              <a href="#" className="px-5 py-5 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none scale-95 hover:scale-100 transition-all	">
                <p className="text-[#2D68FF] font-bold text-center text-2xl sm:mt-5">Dog</p>
                <img className="mx-auto mt-3" src="https://doggoslife.s3.ap-northeast-2.amazonaws.com/dog-icon.png" />
                <p className="text-center text-zinc-500 text-sm font-medium mt-6">Create a fundraiser for <br className="hidden md:inline-block" /> your dog's medical<br className="hidden md:inline-block" /> emergency </p>
                <div className="mt-6 px-2 py-3 text-[#2D68FF] font-medium text-sm text-center bg-[#2D68FF] bg-opacity-10 rounded-lg">Start Fundraiser →</div>
              </a>

              <a href="#" className="px-5 py-5 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none scale-95 hover:scale-100 transition-all	">
                <p className="text-[#F07300] font-bold text-center text-2xl sm:mt-5">Shelter</p>
                <img className="mx-auto mt-3" src="https://doggoslife.s3.ap-northeast-2.amazonaws.com/shelter-icon.png" />
                <p className="text-center text-zinc-500 text-sm font-medium mt-6">Create a fundraiser for <br className="hidden md:inline-block" /> your dog's medical<br className="hidden md:inline-block" /> emergency </p>
                <div className="mt-6 px-2 py-3 text-[#F07300] font-medium text-sm text-center bg-[#F07300] bg-opacity-10 rounded-lg">Start Fundraiser →</div>
              </a>

              <a href="#" className="px-5 py-5 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none scale-95 hover:scale-100 transition-all	">
                <p className="text-[#E84C7B] font-bold text-center text-2xl sm:mt-5">Household</p>
                <img className="mx-auto mt-3" src="https://doggoslife.s3.ap-northeast-2.amazonaws.com/household-icon.png" />
                <p className="text-center text-zinc-500 text-sm font-medium mt-6">Create a fundraiser for <br className="hidden md:inline-block" /> your dog's medical<br className="hidden md:inline-block" /> emergency </p>
                <div className="mt-6 px-2 py-3 text-[#E84C7B] font-medium text-sm text-center bg-[#E84C7B] bg-opacity-10 rounded-lg">Start Fundraiser →</div>
              </a>
            </div>
          </div>
        }
      />

    </main >
  )
}