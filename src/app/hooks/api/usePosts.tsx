import { queryKeys } from "@/app/queryKey/queryKeys";
import { Post } from "@/app/types/post.interface";
import { useQuery } from "@tanstack/react-query";

const getPosts = async (limit?: number) => {
  const limitParam = limit ? `?limit=${limit}` : null;
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

  // const dogIdsParam = dogIds ? `?dogIds=${dogIds}` : null;
  const res = await fetch(`http://localhost:3000/posts/favorites?limit=${limit}${dogIdsParam}`);

  return res.json();
};

const useFavoriteDogsPosts = (limit: number, dogIds: number[]) => {
  return useQuery<Post[]>(
    queryKeys.favoriteDogsPosts(limit, dogIds),
    () => getFavoriteDogsPosts(limit, dogIds),
  );
};

export { usePosts, usePost, useFavoriteDogsPosts }