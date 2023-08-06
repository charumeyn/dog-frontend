"use client"

import DogCard from "@/app/components/layout/common/DogCard";
import { usePost } from "@/app/hooks/api/usePosts";
import { Dog } from "@/app/types/dog.interface";

export default function Post({ params }: { params: any }) {

  const id = Number(params.id);

  const { data: post, isLoading: isLoadingPost } = usePost(id);

  return (
    <main>
      <section className="py-16">
        <div className="w-full max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-bold text-xl">{post?.title}</h3>
          <p className="text-neutral-500 text-sm">post?.created_at</p>
        </div>

        <img src={post?.thumb_image} className="w-full max-w-4xl aspect-[16/9] mx-auto" />

        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-x-6 mb-5">
            <p>{post?.content}</p>
          </div>
          <div className="border border-neutral-100 px-5 py-5 rounded-lg">
            insert description
          </div>
          <div>
            insert address
          </div>
          <div>
            insert google map
          </div>
        </div>
      </section>


    </main>
  )
}