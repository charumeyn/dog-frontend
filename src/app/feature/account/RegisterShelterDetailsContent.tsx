"use client"

import Button from "@/app/components/layout/common/Button";
import Input, { InputType } from "@/app/components/layout/common/Input";
import S3Uploader from "@/app/components/libraries/S3Uploader";
import { useRegister } from "@/app/hooks/api/useAuth";
import { useCreateShelter } from "@/app/hooks/api/useShelters";
import { SuccessResult } from "@/app/types/apiResult";
import { Shelter } from "@/app/types/shelter.interface";
import { User, UserType } from "@/app/types/user.interface";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function RegisterShelterDetailsContent({ userId }: { userId: number }) {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>('')

  const router = useRouter();

  const onRegisterSuccess = useCallback((data: SuccessResult<Shelter>) => {
    if (data.success) {
      router.push(`/register-shelter/thank-you`)
    }
  }, []);

  const onRegisterError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { mutate: createShelter } = useCreateShelter(onRegisterSuccess, onRegisterError)

  const submit = useCallback((e: any) => {
    e.preventDefault();

    createShelter({ name, description, content, images, mainImage, userId })
  }, [name, description, content, images, mainImage, userId])


  return (
    <div className="bg-white p-8 rounded-lg">

      <form className="grid gap-5">
        <Input type={InputType.Text}
          name={"name"} label="Shelter Name" placeholder="Shelter Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input type={InputType.Text}
          name={"description"} label="Description" placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <span className="block text-sm font-medium leading-6 text-zinc-900">Content</span>
          <textarea
            id="content"
            name="content"
            rows={5}
            cols={20}
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
            className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <span className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Images</span>
          <S3Uploader images={images} setImages={setImages} mainImage={mainImage} setMainImage={setMainImage} />
        </div>

        <Button type="submit" onClick={submit} content={"Register"} />
      </form>
    </div>
  )
}
