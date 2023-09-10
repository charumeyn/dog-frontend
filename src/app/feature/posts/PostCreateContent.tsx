"use client"

import Button from "@/app/components/layout/common/Button"
import Input, { InputType } from "@/app/components/layout/common/Input"
import S3Uploader from "@/app/components/libraries/S3Uploader"
import { useAccount } from "@/app/hooks/api/useAuth"
import { useDogs } from "@/app/hooks/api/useDogs"
import { useCreatePost } from "@/app/hooks/api/usePosts"
import { useShelter } from "@/app/hooks/api/useShelters"
import { UserType } from "@/app/types/user.interface"
import { useCallback, useEffect, useState } from "react"
import SelectedDog from "../fundraisers/SelectedDog"
import { SuccessResult } from "@/app/types/apiResult"
import { Post } from "@/app/types/post.interface"
import { useRouter } from "next/navigation"

export default function PostCreateContent() {

  const { data: account } = useAccount()
  const [shelterId, setShelterId] = useState<number>(0)
  const [dogId, setDogId] = useState<number | undefined>(undefined)
  const [images, setImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>("")

  useEffect(() => {
    if (account) {
      setShelterId(account?.shelter.id)
    }
  }, [account, setShelterId])

  const { data: shelter } = useShelter(shelterId)
  const [content, setContent] = useState<string>("")

  const router = useRouter();

  const onSuccess = useCallback((data: SuccessResult<Post>) => {
    router.push(`/dogs/${data.data.dog.id}`)
  }, [])

  const onError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { mutate: create, isLoading } = useCreatePost(onSuccess, onError)

  const submit = useCallback((e: any) => {
    e.preventDefault();

    if (account) {
      const body = {
        dogId,
        content,
        mainImage,
        images,
      }
      create(body)
    }
  }, [dogId, content, mainImage, images])

  return (
    account?.type === UserType.Shelter ?
      <div className="rounded-lg bg-white p-8 grid grid-cols-1 gap-4">

        <div className="col-start-1 col-span-1">
          <span className="block text-sm font-medium leading-6 text-zinc-900">Select a Dog</span>
          <select
            id="dog"
            name="Dog"
            value={dogId}
            onChange={(e: any) => setDogId(e.target.value)}
            disabled={dogId != undefined}
            className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
          >
            {shelter && shelter.dogs?.map((dog) => (
              <option key={dog.id} value={dog.id}>
                {dog.name}
              </option>
            ))}
          </select>
        </div>

        {dogId !== undefined ?
          <SelectedDog dogId={dogId} setDogId={setDogId} /> : null}
        <div>
          <h3 className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Upload images</h3>
          <S3Uploader images={images} setImages={setImages} mainImage={mainImage} setMainImage={setMainImage} />
        </div>

        <div>
          <span className="block text-sm font-medium leading-6 text-zinc-900">Content</span>
          <textarea
            id="content"
            name="content"
            rows={10}
            cols={20}
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
            className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
          />
        </div>

        <Button type={"submit"} onClick={(e: any) => submit(e)} content={isLoading ? "Posting..." : "Post"} disabled={isLoading} />



      </div>
      : null
  )
}