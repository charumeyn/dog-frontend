"use client"

import { useDogs } from "./hooks/api/useDogs";
import DogCard from "./components/layout/common/DogCard";
import { Dog } from "./types/dog.interface";
import { usePosts } from "./hooks/api/usePosts";
import PostCard from "./components/layout/common/PostCard";
import { Post } from "./types/post.interface";
import { useFundraisers } from "./hooks/api/useFundraisers";
import { Fundraiser } from "./types/fundraiser.interface";
import FundraiserCard from "./components/layout/common/FundraiserCard";

export default function Home() {

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
          <div className="text-gray-400 mb-5">
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

      <section className="py-16 bg-gray-100">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-9">Meet The Dogs</h2>
        </div>
        <div className="w-full max-w-screen-2xl mx-auto px-4 grid grid-cols-4 gap-x-8">
          {isLoadingDogs ?
            "LOADING" :
            dogs?.map((dog: Dog, i: number) =>
              <DogCard key={i} dog={dog} />
            )}
        </div>
        <a className="mt-10 block table font-medium mx-auto px-8 py-3 border border-gray-300 rounded-full" href={`/dogs/`}>View all dogs</a>
      </section>

      <section className="bg-gray-100">
        <hr className="max-w-screen-2xl mx-auto" />
      </section>

      <section className="py-16 bg-gray-100">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">The Doggo Diaries</h2>
          <p className="mb-9 text-gray-500">Life updates from our precious dogs!</p>
        </div>
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-x-8">
            {isLoadingPosts ?
              "LOADING" :
              posts?.map((post: Post, i: number) =>
                <PostCard key={i} post={post} />
              )}
          </div>
          <a className="mt-10 block table font-medium mx-auto px-8 py-3 border border-gray-300 rounded-full" href={`/dogs/`}>View all posts</a>
        </div>
      </section>

      <section className="py-16">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-9 text-center">Featured Fundraisers</h2>
        </div>
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-x-8">
            {isLoadingFundraisers ?
              "LOADING" :
              fundraisers?.map((fundraiser: Fundraiser, i: number) =>
                <FundraiserCard key={i} fundraiser={fundraiser} />
              )}
          </div>
          <a className="mt-10 block table font-medium mx-auto px-8 py-3 border border-gray-300 rounded-full" href={`/fundraisers/`}>View all fundraisers</a>
        </div>
      </section>

      <section>
        <hr className="max-w-screen-2xl mx-auto" />
      </section>

      <section className="py-16">
        <div className="w-full max-w-screen-lg mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Open your fundraiser</h2>
          <p className="mb-9 text-gray-500 text-center">Let other people help you with your cause about:</p>
        </div>
        <div className="w-full max-w-screen-lg mx-auto px-4">
          <div className="grid grid-cols-3 gap-x-8">
            <div className="border border-lightgray rounded-lg px-5 py-16 font-semibold">
              Dog’s<br />
              Medical<br />
              Emergency<br /><br />
              ➞
            </div>
            <div className="border border-lightgray rounded-lg px-8 py-16 font-semibold text-lg">
              Helping<br />
              a Dog's<br />
              Household<br /><br />
              ➞
            </div>
            <div className="border border-lightgray rounded-lg px-8 py-16 font-semibold text-lg">
              Dog<br />
              Shelter<br />
              in Need<br /><br />
              ➞
            </div>
          </div>
        </div>
      </section>
    </main >
  )
}
