import Container, { ContainerType } from "@/app/components/layout/Container";
import PostCard from "@/app/components/layout/common/PostCard";
import { usePosts } from "@/app/hooks/api/usePosts";
import SelectedFilters from "./SelectedFilters";
import { useState } from "react";
import Pagination from "@/app/components/layout/common/Pagination";
import { PostCardSkeleton } from "@/app/components/layout/common/CardSkeleton";

export default function PostListContent() {

  const [limit, setLimit] = useState<number>(12)
  const [offset, setOffset] = useState<number>(1);
  const { data: posts, isLoading } = usePosts()

  return (
    posts ?
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <>
            <SelectedFilters
              limit={limit}
              setLimit={setLimit}
              length={posts.length}
            />
            <div className="grid grid-cols-3 gap-1 md:grid-cols-5 lg:grid-cols-6 md:gap-2 mb-10">
              {isLoading ?
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) =>
                  <PostCardSkeleton key={x} />) :
                posts.map((post, i) =>
                  <PostCard key={i} id={post.id} dog={post.dog} />
                )}
            </div>
            <Pagination offset={offset} setOffset={setOffset} limit={limit} currentLength={posts?.length} />
          </>
        }
      />
      : null
  )
}