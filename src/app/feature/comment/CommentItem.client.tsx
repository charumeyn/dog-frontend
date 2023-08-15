"use client"


import Heading from "@/app/components/layout/common/Heading";
import { useComment } from "@/app/hooks/api/useComment";
import { Comment } from "@/app/types/comment.interface";
import { CommentType } from "@/app/types/enum/commentType.enum"
import moment from "moment";

type CommentListProps = {
  comments: any;
}

type CommentRowProps = {
  commentId: number;
}

const CommentList: React.FunctionComponent<CommentListProps> = ({ comments }) => {
  return (
    comments.map((comment: Comment) => (
      <CommentRow key={comment.id} commentId={comment.id} />
    ))

  )
}

const CommentRow: React.FunctionComponent<CommentRowProps> = ({ commentId }) => {

  const { data: comment } = useComment(commentId)

  return (
    comment ?
      <div className="flex gap-x-4 mb-8">
        <img src={comment?.dog?.mainImage} alt={comment.user.firstName} className="rounded-full w-14 h-14" />
        <div>
          {comment.user.firstName ?
            <Heading type="h2" text={comment.user.firstName} /> : null}
          <p className="text-zinc-500 mb-2 text-sm">{moment(comment.createdAt).format("YYYY.MM.DD")}</p>
          <p className="text-zinc-800">{comment.content}</p>
        </div>
      </div> : null
  )
}

export default CommentList;