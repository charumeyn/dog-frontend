import { queryKeys } from "@/app/queryKey/queryKeys";
import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { Comment, CreateCommentDto } from "@/app/types/comment.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

const getComment = async (id: number) => {
  const res = await fetch(`http://localhost:3000/comments/${id}`);
  return res.json();
};

const useComment = (id: number) => {
  return useQuery<Comment>(
    queryKeys.comment(id),
    () => getComment(id),
  );
};

const createComment = async (dto: CreateCommentDto) => {
  const res = await fetch(`http://localhost:3000/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...dto
    })
  });

  const data = await res.json();
  return data;
}

const useCreateComment = (
  onCreateSuccess?: (data: SuccessResult<Comment>) => void,
  onCreateError?: (error: FailResult) => void
) => {
  return useMutation((dto: CreateCommentDto) => createComment(dto), {
    onSuccess: (data: SuccessResult<Comment> | FailResult) => {
      if (!data.success) {
        if (onCreateError) onCreateError(data)
      } else if (onCreateSuccess) {
        onCreateSuccess(data)
      }
    },
    onError: (error: FailResult) => {
      if (onCreateError) {
        onCreateError(error);
      }
    },
  });
};

export { useCreateComment, useComment }