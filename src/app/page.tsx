"use client"

import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { useDogs } from './hooks/api/useDogs';
import DogCard from './components/layout/common/DogCard';
import { Dog } from './types/dog.interface';
import { usePosts } from './hooks/api/usePosts';
import PostCard from './components/layout/common/PostCard';
import { Post } from './types/post.interface';
import { useFundraisers } from './hooks/api/useFundraisers';
import { Fundraiser } from './types/fundraiser.interface';
import FundraiserCard from './components/layout/common/FundraiserCard';

export default function Home() {

  const { data: dogs, isLoading: isLoadingDogs } = useDogs(4);
  const { data: posts, isLoading: isLoadingPosts } = usePosts();
  const { data: fundraisers, isLoading: isLoadingFundraisers } = useFundraisers();


  return (
    <main>
      <section className="bg-gray-100 py-10">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          Doggo ipsum shoober vvv very
          hand that feed shibe big ol pupper
          <a href="" className='block'>Learn more about us</a>
        </div>
      </section>
      <section className='py-10'>
        <div className='w-full max-w-screen-2xl mx-auto px-4 grid grid-cols-2'>
          <div>
            1 Sponsor a Dog
          </div>
          <div>
            2 Participate in Fundraising
          </div>
        </div>
      </section>
      <section className='py-10'>
        <div className='w-full max-w-screen-2xl mx-auto px-4'>
          <h2 className='text-center'>Meet The Dogs</h2>
        </div>
        <div className='w-full max-w-screen-2xl mx-auto px-4 grid grid-cols-4 gap-x-4'>
          {isLoadingDogs ?
            "LOADING" :
            dogs?.map((dog: Dog, i: number) =>
              <DogCard key={i} dog={dog} />
            )}
        </div>
        <a href={`/dogs/`}>View all dogs</a>
      </section>
      <section className='py-10'>
        <div className='w-full max-w-screen-2xl mx-auto px-4'>
          <h2 className='text-center'>Meet The Dogs</h2>
        </div>
        <div className='w-full max-w-screen-2xl mx-auto px-4 grid grid-cols-3 gap-x-4'>
          {isLoadingPosts ?
            "LOADING" :
            posts?.map((post: Post, i: number) =>
              <PostCard key={i} post={post} />
            )}
        </div>
        <a href={`/dogs/`}>View all posts</a>
      </section>
      <section className='py-10'>
        <div className='w-full max-w-screen-2xl mx-auto px-4'>
          <h2 className='text-center'>Fundraisers</h2>
        </div>
        <div className='w-full max-w-screen-2xl mx-auto px-4 grid grid-cols-3 gap-x-4'>
          {isLoadingFundraisers ?
            "LOADING" :
            fundraisers?.map((fundraiser: Fundraiser, i: number) =>
              <FundraiserCard key={i} fundraiser={fundraiser} />
            )}
        </div>
        <a href={`/fundraisers/`}>View all fundraisers</a>
      </section>
      <section className='py-10'>
        <div className='w-full max-w-screen-2xl mx-auto px-4'>
          <h2 className='text-center'>Open your fundraiser</h2>
        </div>
        <div className='w-full max-w-screen-xl mx-auto px-4 grid grid-cols-3 gap-x-4'>
          <div>
            Dog’s
            Medical
            Emergency
          </div>
          <div>
            Dog’s
            Medical
            Emergency
          </div>
          <div>
            Dog’s
            Medical
            Emergency
          </div>
        </div>
        <a href={`/fundraisers/`}>View all dogs</a>
      </section>
    </main >
  )
}
