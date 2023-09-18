"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import PostListContent from "@/app/feature/posts/PostListContent";
import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";

export default function PostList() {

  const { data: account } = useAccount()

  return (
    <div>
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <div className="pt-20 pb-10 flex justify-between items-end">
            <div>
              <Heading type={"h1"} text={"Doggo Diaries"} className="text-3xl font-bold mb-3" />
              <p className="text-zinc-500">Enjoy a feed full of cute dogs here!</p>
            </div>
            {account?.type === UserType.Shelter ?
              <a className="text-teal-600 font-medium" href="/posts/create">+ Post a Doggo Diary</a>
              : null}
          </div>
        } />

      <PostListContent />
    </div>
  )
}