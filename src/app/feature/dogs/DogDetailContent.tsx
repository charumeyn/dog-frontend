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

export default function DogDetailContent({ id }: { id: number }) {

  const { data: dog, isLoading: isLoadingDog, isFetching, error } = useDog(id);
  const { data: dogs, isLoading: isLoadingDogs } = useDogs(4);
  const { data: account } = useAccount();

  return (
    <main>
      <Container
        type={ContainerType.ImageWithContent}
        className="mt-16"
        imageContent={
          dog ?
            <ImageGallery images={dog?.images} mainImage={dog?.mainImage} /> : null
        }
        mainContent={
          <div className="bg-white rounded-xl py-8 px-8 border border-zinc-300">
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
              <div className="border border-zinc-100 rounded-lg px-5 py-5 mb-8">
                <p className="text-sm">{dog?.description}</p>
              </div>
              <p className="font-medium mb-2">Initiated by</p>
              <div className="flex items-center justify-between pb-8 border-b border-zinc-100">
                <div className="flex items-center gap-x-6">
                  <img src={dog?.shelter.mainImage + '.jpeg'} className="w-20 h-20 rounded-full" />
                  <div>
                    <h3 className="font-bold">{dog?.shelter.name}</h3>
                    <p className="text-zinc-500 text-sm">insert description</p>
                  </div>
                </div>
                <div>
                  <a href={""} className="font-medium px-8 py-3 border border-zinc-300 rounded-full">Visit ➞</a>
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
              <Heading type="h2" text="Comments from the sponsors" className="mb-5" />
              <CommentList comments={dog?.comments} />
            </> : null
        }
      />

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

      <Container
        type={ContainerType.SingleColumn}
        className="py-16"
        mainContent={
          <>
            <Heading type={"h1"} text={"Meet other dogs"} className="text-center mb-10" />
            <Grid
              columns={4}
              content={
                dogs?.map((dog, i) =>
                  <DogCard key={i} dog={dog} />
                )
              } />
            <a className="mt-10 block table font-medium mx-auto px-8 py-3 border border-zinc-300 rounded-full" href={`/fundraisers/`}>View all dogs</a>
          </>
        }
      />
    </main>
  )
}