"use client"

import Button from "@/app/components/layout/common/Button";
import Input, { InputType } from "@/app/components/layout/common/Input";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useDog, useUpdateDog } from "@/app/hooks/api/useDogs";
import { CoatLength } from "@/app/types/enum/coatLength.enum";
import { Color } from "@/app/types/enum/color.enum";
import { Gender } from "@/app/types/enum/gender.enum";
import { Size } from "@/app/types/enum/size.enum";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RadioButton from "@/app/components/layout/common/RadioButton";
import S3Uploader from "@/app/components/libraries/S3Uploader";
import Heading from "@/app/components/layout/common/Heading";
import { IconCheck } from "@/app/components/layout/Icons";

interface SelectList {
  label: string;
  value: string;
}

export default function EditDogContent({ id }: { id: number }) {
  const [name, setName] = useState<string>("")
  const [birthdate, setBirthdate] = useState<Date>(new Date())
  const [size, setSize] = useState<Size>(Size.S)
  const [gender, setGender] = useState<Gender>(Gender.F)
  const [coatLength, setCoatLength] = useState<CoatLength>(CoatLength.None)
  const [mainImage, setMainImage] = useState<string>("")
  const [images, setImages] = useState<string[]>([])
  const [description, setDescription] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [breeds, setBreeds] = useState<string[]>([])
  const [colors, setColors] = useState<Color>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { data: account } = useAccount();
  const { data: dog } = useDog(id)

  const router = useRouter();

  useEffect(() => {
    if (account) {
      if (account.id === undefined) {
        router.push("/login")
      }
    }
  }, [account])

  useEffect(() => {
    if (dog) {
      setName(dog?.name)
      setBirthdate(new Date(dog?.birthdate))
      setSize(dog?.size)
      setGender(dog?.gender)
      setCoatLength(dog?.coatLength)
      setMainImage(dog?.mainImage)
      setImages(dog?.images)
      setDescription(dog?.description)
      setContent(dog?.content)
      setColors(dog?.color)
      setBreeds(dog?.breed)
    }
  }, [dog, setName, setBirthdate, setSize, setGender, setCoatLength, setMainImage, setImages, setDescription, setContent, setColors, setBreeds])

  const onSuccess = useCallback(() => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  }, [setIsSuccess])

  const onError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { mutate: update, isLoading } = useUpdateDog(onSuccess, onError)

  const submit = useCallback((e: any) => {
    e.preventDefault();

    if (account) {
      const body = {
        id,
        name,
        birthdate,
        gender,
        size,
        coatLength,
        mainImage,
        images,
        description,
        content
      }
      update(body)
    }
  }, [name, breeds, birthdate, gender, colors, size, coatLength, mainImage, images, description])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="Edit Dog" />
        <a href="/account/dogs/" className="text-gray-500 font-semibold text-sm">Back</a>
      </div>
      <div className="bg-white px-5 py-4 md:p-8 rounded-lg border border-zinc-200">
        <form onSubmit={submit} className="grid gap-5 grid-cols-5">

          <div className="col-span-5 lg:col-span-3">
            <Input type={InputType.Text}
              name={"Name"} placeholder="Name" label="Name" value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-span-5 lg:col-start-1 lg:col-span-2">
            <span className="block text-sm font-medium leading-6 text-zinc-900">Birthdate</span>
            <DatePicker
              selected={birthdate}
              onChange={(date: Date) => setBirthdate(date)}
              className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-5 lg:col-span-1">
            <span className="block text-sm font-medium leading-6 text-zinc-900">Gender</span>
            <div className="flex items-center space-x-10 space-y-0 mt-4 capitalize">
              {Object.values(Gender).map((value, i) =>
                <RadioButton key={i} value={value} selected={gender} setSelected={setGender} />
              )}
            </div>
          </div>

          <div className="col-span-5 lg:col-start-1 lg:col-span-2">
            <span className="block text-sm font-medium leading-6 text-zinc-900">Breed/s</span>
            <div className="bg-zinc-100 mt-2 text-zinc-500 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
              {dog?.breed.map((breed) => (
                <span>{breed}</span>
              ))}
            </div>
          </div>

          <div className="col-span-5 lg:col-span-2">
            <span className="block text-sm font-medium leading-6 text-zinc-900">Color/s</span>
            <div className="bg-zinc-100 mt-2 text-zinc-500 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6">
              {dog?.color}
            </div>
          </div>

          <div className="col-span-5 lg:col-start-1 lg:col-span-2">
            <span className="block text-sm font-medium leading-6 text-zinc-900">Size</span>
            <select
              id="size"
              name="size"
              value={size}
              onChange={(e: any) => setSize(e.target.value)}
              className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            >
              {Object.entries(Size).map((size) => (
                <option key={size[0]} value={size[1]}>
                  {size[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-5 lg:col-span-2">
            <span className="block text-sm font-medium leading-6 text-zinc-900">Coat Length</span>
            <select
              id="coatLength"
              name="coatLength"
              value={coatLength}
              onChange={(e: any) => setCoatLength(e.target.value)}
              className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            >
              {Object.entries(CoatLength).map((length) => (
                <option key={length[0]} value={length[1]}>
                  {length[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-5 lg:col-span-4">
            <Input type={InputType.Text}
              name={"Description"} placeholder="Description" label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-span-5 lg:col-span-4">
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

          <div className="col-span-5">
            <h3 className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Upload images</h3>
            <S3Uploader images={images} setImages={setImages} mainImage={mainImage} setMainImage={setMainImage} />
          </div>

          {isSuccess ?
            <Button type={"submit"} color="green" disabled={true} content={<div><IconCheck className="w-5 h-5 inline-block mr-2" /> Saved!</div>} />
            :
            <Button type={"submit"} onClick={(e: any) => submit(e)} content={isLoading ? "Saving..." : "Save"} disabled={isLoading} />
          }
        </form>
      </div>
    </div>
  )
}
