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

export { usePosts }