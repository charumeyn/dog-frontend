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
import ButtonLink from "@/app/components/layout/common/ButtonLink";
import BorderLink from "@/app/components/layout/common/BorderLink";

export default function HomeContent() {

  const { data: dogs, isLoading: isLoadingDogs } = useDogs(4);
  const { data: posts, isLoading: isLoadingPosts } = usePosts(3);
  const { data: fundraisers, isLoading: isLoadingFundraisers } = useFundraisers(4);

  return (
    <main>
      <section className="bg-[#FFF4DA] py-16">
        <div className="w-full max-w-screen-xl mx-auto px-4 relative">
          <div className="text-3xl font-bold leading-relaxed">
            Doggo ipsum shoober vvv very<br />
            hand that feed shibe big ol pupper
          </div>
          <a href="" className="inline-block mt-10 bg-teal-600 text-white text-md px-6 py-3 rounded-full">Learn more about us</a>
          <div className="max-w-sm absolute top-0 right-0">
            <img src="/images/home-banner.png" className="w-full" />
          </div>
        </div>

      </section>
      <section className="pt-10 pb-20">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <div className="text-zinc-400 mb-5">
            Ways to help
          </div>
          <div className="flex gap-x-14 text-lg font-semibold">
            <div className="flex items-center gap-x-4">
              <img src="/images/icon-dog.png" className="w-8 h-8" />
              Sponsor a Dog
            </div>
            <div className="flex items-center gap-x-4">
              <img src="/images/icon-donate.png" className="w-8 h-8" />
              Participate in Fundraising
            </div>
          </div>
        </div>
      </section>

      <Container
        type={ContainerType.SingleColumn}
        withBg
        className="py-14"
        mainContent={
          <div>
            <Heading type={"h1"} text={"Meet The Dogs"} className="!text-2xl text-center mb-6" />
            <div className="grid grid-cols-4 gap-x-8">
              {isLoadingDogs ?
                "LOADING" :
                dogs?.map((dog: Dog, i: number) =>
                  <DogCard key={i} dog={dog} />
                )}
            </div>
            <BorderLink url={"/dogs/"} text={"View all dogs"} withArrow={true} containerClasses="mt-6 text-center" />
          </div>
        }
      />

      <section className="bg-zinc-100">
        <hr className="max-w-screen-2xl mx-auto" />
      </section>

      <Container
        type={ContainerType.SingleColumn}
        withBg
        className="py-14"
        mainContent={
          <div>
            <Heading type={"h1"} text={"The Doggo Diaries"} className="!text-2xl" />
            <Heading type={"h3"} text={"Life updates from our precious dogs!"} className="mb-6 !text-normal" />
            <div className="grid grid-cols-4 gap-x-8">
              {isLoadingPosts ?
                "LOADING" :
                posts?.map((post: Post, i: number) =>
                  <PostCard key={i} post={post} />
                )}
            </div>
            <BorderLink url={"/posts/"} text={"View all posts"} withArrow={true} containerClasses="mt-6 text-center" />
          </div>
        }
      />

      <Container
        type={ContainerType.SingleColumn}
        className="py-14"
        mainContent={
          <div>
            <Heading type={"h1"} text={"Featured Fundraisers"} className="!text-2xl text-center mb-6" />
            <div className="grid grid-cols-4 gap-x-8">
              {isLoadingFundraisers ?
                "LOADING" :
                fundraisers?.map((fundraiser: Fundraiser, i: number) =>
                  <FundraiserCard key={i} fundraiser={fundraiser} />
                )}
            </div>
            <BorderLink url={"/fundraisers/"} text={"View all fundraisers"} withArrow={true} containerClasses="mt-6 text-center" />
          </div>
        }
      />

      <section>
        <hr className="max-w-screen-2xl mx-auto" />
      </section>

      <section className="py-16">
        <div className="w-full max-w-screen-lg mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Open your fundraiser</h2>
          <p className="mb-9 text-zinc-500 text-center">Let other people help you with your cause about:</p>
        </div>
        <div className="w-full max-w-screen-lg mx-auto px-4">
          <div className="grid grid-cols-3 gap-x-8">
            <div className="border border-lightzinc rounded-lg px-5 py-16 font-semibold">
              <a href="/fundraisers/create?type=dog">
                Dog’s<br />
                Medical<br />
                Emergency<br /><br />
                ➞
              </a>
            </div>
            <div className="border border-lightzinc rounded-lg px-8 py-16 font-semibold text-lg">
              <a href="/fundraisers/create?type=user">
                Helping<br />
                a Dog's<br />
                Household<br /><br />
                ➞
              </a>
            </div>
            <div className="border border-lightzinc rounded-lg px-8 py-16 font-semibold text-lg">
              <a href="/fundraisers/create?type=shelter">
                Dog<br />
                Shelter<br />
                in Need<br /><br />
                ➞
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}