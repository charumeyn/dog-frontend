"use client"

import Button from "@/app/components/layout/common/Button";
import Input, { InputType } from "@/app/components/layout/common/Input";
import { colorList } from "@/app/data/colorList";
import { breedsList } from "@/app/data/breedsList";
import { useAccount, useRegister } from "@/app/hooks/api/useAuth";
import { useCreateDog } from "@/app/hooks/api/useDogs";
import { SuccessResult } from "@/app/types/apiResult";
import { Dog } from "@/app/types/dog.interface";
import { CoatLength } from "@/app/types/enum/coatLength.enum";
import { Color } from "@/app/types/enum/color.enum";
import { Gender } from "@/app/types/enum/gender.enum";
import { Size } from "@/app/types/enum/size.enum";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RadioButton from "@/app/components/layout/common/RadioButton";
import S3Uploader from "@/app/components/libraries/S3Uploader";
import Heading from "@/app/components/layout/common/Heading";
import { UserType } from "@/app/types/user.interface";

interface SelectList {
  label: string;
  value: string;
}

export default function RegisterDogContent() {
  const [name, setName] = useState<string>("")
  const [birthdate, setBirthdate] = useState<Date>(new Date())
  const [size, setSize] = useState<Size>(Size.S)
  const [gender, setGender] = useState<Gender>(Gender.F)
  const [coatLength, setCoatLength] = useState<CoatLength>(CoatLength.None)
  const [mainImage, setMainImage] = useState<string>("")
  const [images, setImages] = useState<string[]>([])
  const [description, setDescription] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [selectedColors, setSelectedColors] = useState<SelectList[]>([])
  const [selectedBreeds, setSelectedBreeds] = useState<SelectList[]>([])
  const [breeds, setBreeds] = useState<string[]>([])
  const [colors, setColors] = useState<Color[]>([])

  const { data: account } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (account) {
      if (account.id === undefined) {
      }
    }
  }, [account])

  const onCreateSuccess = useCallback((data: SuccessResult<Dog>) => {
    if (data.success) {
      router.push(`/account/dogs`)
    }
  }, []);

  const onCreateError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { mutate: create } = useCreateDog(onCreateSuccess, onCreateError)

  const submit = useCallback((e: any) => {
    e.preventDefault();

    if (account) {
      const body = {
        name,
        breed: breeds,
        birthdate,
        gender,
        color: colors[0],
        size,
        coatLength,
        mainImage,
        images,
        description,
        content,
        shelterId: account?.type === UserType.Shelter ? Number(account?.shelter.id) : undefined,
        userId: account?.type === UserType.User ? Number(account?.id) : undefined,
      }
      create(body)
    }
  }, [name, breeds, birthdate, gender, colors, size, coatLength, mainImage, images, description])




  useEffect(() => {
    setBreeds(selectedBreeds.map((breed) => breed.value))
  }, [selectedBreeds])

  useEffect(() => {
    setColors(selectedColors as any)
  }, [selectedColors])

  return (
    <div>
      <Heading type="h1" text="Register new dog" className="mb-4" />
      <div className="bg-white px-5 py-4 md:p-8 rounded-lg border border-zinc-200">
        <form onSubmit={submit} className="grid gap-5 grid-cols-5">

          <div className="col-span-5 lg:col-span-3">
            <Input type={InputType.Text}
              name={"Name"} placeholder="Name" label="Name"
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
            <span className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Breed (Select multiple if mixed)</span>
            <Select
              options={breedsList}
              placeholder="Select breed/s"
              value={selectedBreeds}
              onChange={(breed) => setSelectedBreeds(breed as SelectList[])}
              isSearchable={true}
              isMulti
            />
          </div>

          <div className="col-span-5 lg:col-span-2">
            <span className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Color</span>
            <Select
              options={colorList}
              placeholder="Select color.s"
              value={selectedColors}
              onChange={(color) => setSelectedColors(color as any)}
              isSearchable={true}
            />
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-span-5 lg:col-span-4">
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


          <div className="col-span-5">
            <h3 className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Upload images</h3>
            <S3Uploader images={images} setImages={setImages} mainImage={mainImage} setMainImage={setMainImage} />
          </div>

          <div className="col-span-4 mt-4">
            <Button type="submit" onClick={submit} content={"Register Dog"} />
          </div>
        </form>
      </div>
    </div>
  )
}
