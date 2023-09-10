"use client"

import Container, { ContainerType } from "@/app/components/layout/Container"
import Heading from "@/app/components/layout/common/Heading"
import PostCreateContent from "@/app/feature/posts/PostCreateContent"

export default function CreatePost() {

  return (
    <Container
      type={ContainerType.MidColumn}
      withBg
      className="pt-14 pb-14"
      mainContent={
        <>
          <Heading type={"h1"} text={"Create a Post"} className="mb-4" />
          <PostCreateContent />
        </>
      }
    />
  )
}