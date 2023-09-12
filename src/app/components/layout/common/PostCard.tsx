"use client"

import { Post } from "@/app/types/post.interface";
import PostModal from "./PostPopup";
import { useCallback, useMemo, useState } from "react";
import ImageGallery from "./ImageGallery";
import AddToFavorites from "@/app/feature/dogs/AddToFavorites";
import { Dog } from "@/app/types/dog.interface";
import { User } from "@/app/types/user.interface";
import { usePost } from "@/app/hooks/api/usePosts";
import { useComment, useCreateComment } from "@/app/hooks/api/useComment";
import moment from "moment";
import { useAccount } from "@/app/hooks/api/useAuth";
import Input, { InputType } from "./Input";
import { CommentType } from "@/app/types/enum/commentType.enum";
import Button from "./Button";
import Alert from "./Alert";
import { IconCheck, IconComment } from "../Icons";

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
            alt={String(post.id)} />

          <div className="absolute w-full h-full object-cover flex flex-col items-center bg-black text-white after:content-[''] after:block after:pb-[100%] opacity-0 hover:opacity-80 hover:cursor-pointer text-sm md:text-normal">
            <div className="flex items-center gap-2 mt-5 lg:mt-28 text-center">
              {post.comments ? post.comments.length > 0 ?
                <>
                  <IconComment />{post.comments.length} comments</>
                : "Be the first to comment ❤️"
                : "Be the first to comment ❤️"}
            </div>
          </div>
        </div>

      </div>
      <PostModal
        isOpen={isOpen} setIsOpen={setIsOpen}
        children={
          <div className="grid md:grid-cols-2 gap-x-8">
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


export function PostCardContent({ account, dogId, postId }: { account: User, dogId: number, postId: number }) {

  const existingId = useMemo(() => {
    if (account.id && account.favoriteDogIds.length > 0) {
      return account.favoriteDogIds.some(id => Number(id) === Number(dogId))
    }
  }, [account]);

  const { data: post } = usePost(postId)

  return (
    post ?
      <div className="flex flex-col">
        <div>
          <div className="flex gap-x-5 justify-between md:justify-start border-b border-zinc-200 pb-2 mb-4 mt-2 md:mt-0">
            <div className="flex items-center gap-x-3">
              <img src={post.mainImage} className="w-10 h-10 rounded-full" />
              <span className="text-sm font-medium">
                {post.dog.name}
              </span>
            </div>
            {existingId ?
              null : <AddToFavorites account={account} dogId={dogId} />}
          </div>

          {post?.comments ?
            post?.comments.map((comment, i) => (
              <CommentRow key={i} id={comment.id} />
            )) : null
          }
        </div>

        <div className="mt-auto">
          <CommentBox account={account} postId={postId} />
        </div>

      </div> : null
  )
}

export function CommentRow({ id }: { id: number }) {

  const { data: comment } = useComment(id)

  return (
    comment ?
      <div className="flex gap-x-3 mb-4 text-sm">
        <img src={comment.user.image} alt={comment.user.firstName} className="rounded-full w-10 h-10" />
        <div>
          <p className="text-zinc-800"><span className="font-medium">{comment.user.firstName}</span> {comment.content}</p>
          <p className="text-zinc-500 text-xs mt-1">{moment(comment.createdAt).fromNow()}</p>
        </div>
      </div> : null
  )
}

export function CommentBox({ account, postId }: { account: User, postId: number }) {

  const [comment, setComment] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string[]>([])

  const onSuccess = useCallback(() => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
    setComment("")
  }, [setIsSuccess, setComment])

  const onError = useCallback((error: any) => {
    setError(error.message)
  }, [setError])

  const { mutate: createComment, isLoading } = useCreateComment(onSuccess, onError)

  const handleComment = useCallback((e: any) => {
    e.preventDefault;

    const body = {
      userId: account.id,
      commentType: CommentType.Post,
      postId,
      content: comment,
    }

    createComment(body)
  }, [account, postId, comment])

  const isLoggedIn = useMemo(() => {
    return account && account.id;
  }, [account])

  return (
    <>
      <Alert type="error" message={error} setMessage={setError} />

      <div className="flex gap-x-3 items-end">
        <img src={account.image} className="w-10 h-10 rounded-full" />
        <div className="grow">
          <Input
            type={InputType.Text}
            name={"Comment"}
            placeholder={"Add a comment"}
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            disabled={isLoading}
            required
            noMargin
          />
        </div>

        {isSuccess ?
          <Button type={"submit"} color="green" disabled={true} content={<div>Posted!</div>} />
          :
          <Button type={"submit"} onClick={handleComment} content={isLoading ? "Posting..." : "Post"} disabled={isLoading || !isLoggedIn} />
        }
      </div>
    </>
  )
}

export default PostCard;