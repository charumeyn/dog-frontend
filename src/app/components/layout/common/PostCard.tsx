"use client"

import { Post } from "@/app/types/post.interface";
import PostModal from "./PostPopup";
import { useMemo, useState } from "react";
import ImageGallery from "./ImageGallery";
import AddToFavorites from "@/app/feature/dogs/AddToFavorites";
import { Dog } from "@/app/types/dog.interface";
import { User } from "@/app/types/user.interface";
import { usePost } from "@/app/hooks/api/usePosts";
import { useComment } from "@/app/hooks/api/useComment";
import moment from "moment";
import { useAccount } from "@/app/hooks/api/useAuth";

type PostCard = {
  post: Post;
  dog: Dog;
}

const PostCard: React.FunctionComponent<PostCard> = ({ post, dog }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: account } = useAccount()

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <div className="relative after:content-[''] after:block after:pb-[100%]">
          <img className="absolute w-full h-full object-cover"
            src={post.mainImage}
            alt={post.title} />
        </div >
      </div>
      <PostModal
        isOpen={isOpen} setIsOpen={setIsOpen}
        children={
          <div className="grid grid-cols-2 gap-x-8">
            <ImageGallery images={post.images} mainImage={post.mainImage} isSquare />
            {dog && account ?
              <PostCardContent account={account} dogId={dog.id} postId={post.id} />
              : null}
          </div>
        }
      />
    </>
  )
}


function PostCardContent({ account, dogId, postId }: { account: User, dogId: number, postId: number }) {

  const existingId = useMemo(() => {
    if (account.id && account.favoriteDogIds.length > 0) {
      return account.favoriteDogIds.some(id => Number(id) === Number(dogId))
    }
  }, [account]);

  const { data: post } = usePost(postId)

  return (
    post ?
      <div>
        <div className="flex gap-x-5 items-center border-b border-zinc-200 pb-2  mb-4">
          <div className="flex items-center gap-x-3">
            <img src={post.mainImage} className="w-10 h-10 rounded-full" />
            <span className="text-sm font-medium">
              {post.dog.name}
            </span>
          </div>
          {existingId ?
            null : <AddToFavorites account={account} dogId={dogId} />
          }
        </div>
        {post?.comments ?
          post?.comments.map((comment, i) => (
            <CommentRow key={i} id={comment.id} />
          )) : null
        }
      </div> : null
  )
}

function CommentRow({ id }: { id: number }) {

  const { data: comment } = useComment(id)

  return (
    comment ?
      <div className="flex gap-x-3 mb-4 text-sm">
        <img src={comment.user.image} alt={comment.user.firstName} className="rounded-full w-10 h-10" />
        <div>
          <p className="text-zinc-800"><span className="font-medium">{comment.user.firstName}</span> {comment.content}</p>
          <p className="text-zinc-500 text-xs mt-1">{moment(comment.createdAt).format("YYYY.MM.DD")}</p>
        </div>
      </div> : null
  )
}

export default PostCard;