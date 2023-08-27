"use client"

import Button from "@/app/components/layout/common/Button";
import Input, { InputType } from "@/app/components/layout/common/Input";
import SearchSelect from "@/app/components/layout/common/SearchSelect";
import { breeds } from "@/app/data/breeds";
import { useAccount, useRegister } from "@/app/hooks/api/useAuth";
import { useCreateDog } from "@/app/hooks/api/useDogs";
import { SuccessResult } from "@/app/types/apiResult";
import { Dog } from "@/app/types/dog.interface";
import { CoatLength } from "@/app/types/enum/coatLength.enum";
import { Color } from "@/app/types/enum/color.enum";
import { Gender } from "@/app/types/enum/gender.enum";
import { Size } from "@/app/types/enum/size.enum";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RadioButton from "@/app/components/layout/common/RadioButton";
import S3Uploader from "@/app/components/libraries/S3Uploader";
import Heading from "@/app/components/layout/common/Heading";

export default function RegisterDogContent() {
  const [name, setName] = useState<string>("")
  const [birthdate, setBirthdate] = useState<Date>(new Date())
  const [size, setSize] = useState<Size>(Size.S)
  const [gender, setGender] = useState<Gender>(Gender.F)
  const [coatLength, setCoatLength] = useState<CoatLength>(CoatLength.None)
  const [mainImage, setMainImage] = useState<string>("")
  const [images, setImages] = useState<string[]>([])
  const [description, setDescription] = useState<string>("")
  const [shelterId, setShelterId] = useState<number>(0)
  const [selectedColors, setSelectedColors] = useState()
  const [selectedBreeds, setSelectedBreeds] = useState()

  const { data: account } = useAccount();

  const router = useRouter();

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

    if (account && selectedColors && selectedBreeds) {
      create({ name, breed: selectedBreeds, birthdate, gender, color: selectedColors, size, coatLength, mainImage, images, description, shelterId: account?.shelter.id })
    }
  }, [name, selectedBreeds, birthdate, gender, selectedColors, size, coatLength, mainImage, images, description, shelterId])

  const colorList = [
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "brown", label: "Brown" },
    { value: "red", label: "Red" },
    { value: "gold", label: "Gold" },
    { value: "gray", label: "Gray" },
    { value: "cream", label: "Cream" },
    { value: "yellow", label: "Yellow" },
  ];

  return (
    <div>
      <Heading type="h1" text="Register new dog" className="mb-4" />
      <div className="bg-white p-8 rounded-lg border border-zinc-200">
        <form className="grid gap-5 grid-cols-5">

          <div className="col-span-3">
            <Input type={InputType.Text}
              name={"Name"} placeholder="Name" label="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-start-1 col-span-1">
            <span className="block text-sm font-medium leading-6 text-zinc-900">Birthdate</span>
            <DatePicker
              selected={birthdate}
              onChange={(date: Date) => setBirthdate(date)}
              className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-1">
            <span className="block text-sm font-medium leading-6 text-zinc-900">Gender</span>
            <div className="flex items-center space-x-10 space-y-0 mt-4">
              {Object.values(Gender).map((value) =>
                <RadioButton value={value} selected={gender} setSelected={setGender} />
              )}
            </div>
          </div>

          <div className="col-start-1 col-span-4">
            <span className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Breed (Select multiple if mixed breed)</span>
            <Select
              options={breeds}
              placeholder="Select breed"
              value={selectedColors}
              onChange={() => setSelectedColors(selectedColors)}
              isSearchable={true}
              isMulti
            />
          </div>

          <div className="col-start-1 col-span-4">
            <span className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Colors (Select multiple if has multiple coat color)</span>
            <Select
              options={colorList}
              placeholder="Select color"
              value={selectedColors}
              onChange={() => setSelectedColors(selectedColors)}
              isSearchable={true}
              isMulti
            />
          </div>

          <div className="col-start-1 col-span-1">
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

          <div className="col-span-1">
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


          <div className="col-span-4">
            <Input type={InputType.Text}
              name={"Description"} placeholder="Description" label="Description"
              onChange={(e) => setDescription(e.target.value)}
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
