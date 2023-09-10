import { queryKeys } from "@/app/queryKey/queryKeys";
import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { CreatePostDto, Post } from "@/app/types/post.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

const getPosts = async (limit?: number) => {
  const limitParam = limit ? `?limit=${limit}` : '';
  const res = await fetch(`http://localhost:3000/posts${limitParam}`);

  return res.json();
};

const usePosts = (limit?: number) => {
  return useQuery<Post[]>(
    queryKeys.posts(limit),
    () => getPosts(limit),
  );
};

const getPost = async (id: number) => {
  const res = await fetch(`http://localhost:3000/posts/${id}`);
  return res.json();
};

const usePost = (id: number) => {
  return useQuery<Post>(
    queryKeys.post(id),
    () => getPost(id),
  );
};

const getFavoriteDogsPosts = async (limit: number, dogIds: number[]) => {

  let dogIdsParam: string[] = []

  dogIds.forEach((id) => {
    dogIdsParam.push(`&dogIds[]=${id}`)
  })

  const res = await fetch(`http://localhost:3000/posts/favorites?limit=${limit}${dogIdsParam}`);

  return res.json();
};

const useFavoriteDogsPosts = (limit: number, dogIds: number[]) => {
  return useQuery<Post[]>(
    queryKeys.favoriteDogsPosts(limit, dogIds),
    () => getFavoriteDogsPosts(limit, dogIds),
  );
};

const createPost = async (dto: CreatePostDto) => {
  const res = await fetch(`http://localhost:3000/posts/`, {
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

const useCreatePost = (
  onCreateSuccess: (data: SuccessResult<Post>) => void,
  onCreateError?: (error: FailResult) => void
) => {
  return useMutation((dto: CreatePostDto) => createPost(dto), {
    onSuccess: (data: SuccessResult<Post> | FailResult) => {
      if (!data.success) {
        if (onCreateError) onCreateError(data)
      } else {
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

export { usePosts, usePost, useFavoriteDogsPosts, useCreatePost }