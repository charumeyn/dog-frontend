import { queryKeys } from "@/app/queryKey/queryKeys";
import { Post } from "@/app/types/post.interface";
import { useQuery } from "@tanstack/react-query";

const getPosts = async () => {
  const res = await fetch(`http://localhost:3000/posts`);

  return res.json();
};

const usePosts = () => {
  return useQuery<Post[]>(
    queryKeys.posts(),
    () => getPosts(),
  );
};

export { usePosts }