"use client"

import DogCard from "@/app/components/layout/common/DogCard";
import PostCard from "@/app/components/layout/common/PostCard";
import DogInfo from "@/app/feature/dogs/DogInfo";
import { useDog, useDogs } from "@/app/hooks/api/useDogs";

type Dog = {
  params: any;
}

export default function Dog({ params }: { params: any }) {

  const id = Number(params.id);

  const { data: dog, isLoading: isLoadingDog, isFetching, error } = useDog(id);
  const { data: dogs, isLoading: isLoadingDogs } = useDogs(4);

  return (
    <main>
      <section className="py-16">
        <div className="w-full max-w-screen-xl flex gap-x-8 mx-auto px-4">
          <div className="w-3/5">
            <img className="aspect-[16/9] object-cover rounded-xl"
              src={dog?.images[0]} alt={dog?.name} />
          </div>
          <div className="w-2/5 bg-white rounded-xl py-8 px-8 border border-zinc-300">
            <DogInfo dog={dog} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="max-w-4xl">
            <p className="mb-2 text-zinc-500 text-sm">Created by {dog?.shelter.name}</p>
            <div className="border border-zinc-100 rounded-lg px-5 py-5 mb-8">
              <p className="text-sm">{dog?.description}</p>
            </div>
            <p className="font-medium mb-2">Initiated by</p>
            <div className="flex items-center justify-between pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-x-6">
                <img src={dog?.shelter.image_thumb + '.jpeg'} className="w-20 h-20 rounded-full" />
                <div>
                  <h3 className="font-bold">{dog?.shelter.name}</h3>
                  <p className="text-zinc-500 text-sm">insert description</p>
                </div>
              </div>
              <div>
                <a href={""} className="font-medium px-8 py-3 border border-zinc-300 rounded-full">Visit ➞</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="mb-5 font-medium">Comments from the Sponsors</h2>
            <div className="flex gap-x-5">
              <img src="https://images.pexels.com/photos/3104709/pexels-photo-3104709.jpeg" className="w-16 h-16 rounded-full" />
              <div>
                <p className="font-bold">Charmaine Candava</p>
                <p className="text-zinc-500 text-sm mb-3">$100 • 1 hr ago</p>
                <p className="text-zinc-800 text-sm">Such a cute pup! I hope he's doing well.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {dog?.posts && dog?.posts.length > 0 ?
        <section className="py-16 bg-zinc-100">
          <div className="w-full max-w-screen-2xl mx-auto px-4">
            <h2 className="mb-5 font-bold text-lg">{dog?.name}'s Doggo Diary</h2>
            <div className="w-full max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-3 gap-x-8">
                {dog?.posts.map((post, i) =>
                  <PostCard key={i} post={post} />
                )}
              </div>
            </div>
          </div>
        </section>
        : null
      }

      <section className="py-16">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <h2 className="mb-5 font-bold text-lg">Meet other dogs</h2>
          <div className="w-full max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-4 gap-x-8">
              {dogs?.map((dog, i) =>
                <DogCard key={i} dog={dog} />
              )}
            </div>
            <a className="mt-10 block table font-medium mx-auto px-8 py-3 border border-zinc-300 rounded-full" href={`/fundraisers/`}>View all dogs</a>
          </div>
        </div>
      </section>
    </main>
  )
}