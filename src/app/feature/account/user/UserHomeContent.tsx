import { IconComment } from "@/app/components/layout/Icons";
import Heading from "@/app/components/layout/common/Heading";
import ImageGallery from "@/app/components/layout/common/ImageGallery";
import { PostCardContent } from "@/app/components/layout/common/PostCard";
import PostModalById from "@/app/components/layout/common/PostPopupById";
import { useDog } from "@/app/hooks/api/useDogs";
import { useFavoriteDogsPosts } from "@/app/hooks/api/usePosts";
import { Post } from "@/app/types/post.interface";
import { User } from "@/app/types/user.interface";
import moment from "moment";
import { useState } from "react";

export default function UserHomeContent({ account }: { account: User }) {

  return (
    account ?
      <div className="mx-auto flex w-full items-start gap-x-8">
        <main className="flex-1">
          <DiaryFeed account={account} dogIds={account.favoriteDogIds} />
        </main>
        <aside className="hidden w-60	shrink-0 lg:block">
          <Heading type={"h2"} text={"My Favorite Dogs"} className="!text-zinc-500 mb-5" />
          {account.favoriteDogIds.length > 0 ?
            account.favoriteDogIds.map((id, i) => (
              <FavoritesRow key={i} id={Number(id)} />
            )) : "No favorite dogs yet."}
        </aside>
      </div> : null
  )
}


function DiaryFeed({ dogIds, account }: { dogIds: number[], account: User }) {

  const { data: posts } = useFavoriteDogsPosts(100, dogIds)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalPostId, setModalPostId] = useState<number | undefined>();

  return (
    <div>
      <Heading type={"h1"} text={"Doggo diaries from favorite dogs"} className="mb-4" />
      <div className="rounded-xl border border-zinc-200 divide-y divide-zinc-200">
        {posts?.map((post) => (
          <div className="p-8">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-5">
                <img src={post.dog.mainImage} className="w-14 h-14 rounded-full" />
                <div>
                  <p className="font-medium">{post.dog.name}</p>
                  <p className="text-sm text-zinc-500">{moment(post.createdAt).fromNow()}</p>
                </div>
              </div>

              {post.comments.length > 0 ?
                <CommentButton
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  modalPostId={modalPostId}
                  setModalPostId={setModalPostId}
                  account={account}
                  post={post} />
                :
                <span>Be the first to comment</span>
              }
            </div>
            <p className="mb-5">{post.content}</p>
            <div>
              <ImageGallery images={post.images} mainImage={post.mainImage} isHorizontal={true} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

function CommentButton({
  isOpen,
  setIsOpen,
  modalPostId,
  setModalPostId,
  account,
  post
}: {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  modalPostId: number | undefined,
  setModalPostId: (modalPostId: number | undefined) => void,
  account: User,
  post: Post
}) {

  return (
    <>
      <div onClick={() => setModalPostId(post.id)}
        className="flex items-center gap-1 text-teal-600 font-medium text-sm hover:text-teal-700 hover:cursor-pointer">
        <IconComment className="w-4 h-4" />
        <span className="border-b border-teal-600">{post.comments.length} comments</span>
      </div>

      <PostModalById
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalPostId={modalPostId}
        setModalPostId={setModalPostId}
        postId={post.id}
        children={<div className="grid grid-cols-2 gap-x-8">
          <ImageGallery images={post.images} mainImage={post.mainImage} isSquare />
          <PostCardContent account={account} dogId={post.dog.id} postId={post.id} />
        </div>}
      />
    </>
  )
}

function FavoritesRow({ id }: { id: number }) {

  const { data: dog } = useDog(id)

  return (
    <a href={`/dogs/${dog?.id}`} className="flex items-center gap-4 mb-3 hover:cursor-pointer hover:text-teal-600 font-medium">
      <img src={dog?.mainImage} className="w-14 h-14 rounded-full" />
      <p>{dog?.name}</p>
    </a>
  )
}

