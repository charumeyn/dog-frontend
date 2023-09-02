"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import DogCard from "@/app/components/layout/common/DogCard";
import Grid from "@/app/components/layout/common/Grid";
import Heading from "@/app/components/layout/common/Heading";
import ImageGallery from "@/app/components/layout/common/ImageGallery";
import PostCard from "@/app/components/layout/common/PostCard";
import CommentList from "@/app/feature/comment/CommentItem.client";
import DogDetailContent from "@/app/feature/dogs/DogDetailContent";
import DogInfo from "@/app/feature/dogs/DogInfo";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useDog, useDogs } from "@/app/hooks/api/useDogs";
import { CommentType } from "@/app/types/enum/commentType.enum";

type Dog = {
  params: any;
}

export default function Dog({ params }: { params: any }) {

  return (
    <DogDetailContent id={Number(params.id)} />
  )
}