"use client"

import { IconCheck } from "@/app/components/layout/Icons";
import Button from "@/app/components/layout/common/Button";
import Heading from "@/app/components/layout/common/Heading";
import Input, { InputType } from "@/app/components/layout/common/Input";
import S3Uploader from "@/app/components/libraries/S3Uploader";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useShelter, useUpdateShelter } from "@/app/hooks/api/useShelters";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Map } from "@/app/feature/shelters/Maps"


export default function ShelterEditContent({ id }: { id: number }) {

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [images, setImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [shelterId, setShelterId] = useState<number>(0)

  const { data: account } = useAccount();
  const { data: shelter } = useShelter(shelterId)
  const router = useRouter();

  useEffect(() => {
    if (account) {
      if (account.id === undefined) {
        router.push("/login")
      } else {
        setShelterId(account?.shelter.id)
      }
    }
  }, [account, setShelterId])

  useEffect(() => {
    if (shelter) {
      setName(shelter?.name)
      setDescription(shelter?.description)
      setContent(shelter?.content)
      setAddress(shelter?.address)
      setPhone(shelter?.phone)
      setImages(shelter?.images)
      setMainImage(shelter?.mainImage)
    }
  }, [shelter, setName, setDescription, setContent, setAddress, setPhone, setImages, setMainImage])

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

  const { mutate: update, isLoading } = useUpdateShelter(onSuccess, onError)

  const submit = useCallback((e: any) => {
    e.preventDefault();

    const body = {
      id: shelterId,
      name,
      description,
      content,
      address,
      phone,
      images,
      mainImage,
    }

    update(body)
  }, [shelterId, name, description, content, address, phone, images, mainImage])

  const { isLoaded } = useLoadScript({
    //@ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  })

  const [isEditAddress, setIsEditAddress] = useState<boolean>(false)


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="Edit Shelter" />
      </div>
      <div className="bg-white px-5 py-4 md:p-8 rounded-lg border border-zinc-200">
        <form onSubmit={submit} className="grid gap-5 grid-cols-5">

          <div className="col-span-5 md:col-span-3">
            <Input type={InputType.Text}
              name={"Name"} placeholder="Name" label="Name" value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-span-5 md:col-span-3">
            <Input type={InputType.Text}
              name={"Phone"} placeholder="Phone" label="Phone" value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="col-span-5 md:col-span-3">
            <span className="block text-sm font-medium leading-6 text-zinc-900">
              Address
              <span className="pl-3 text-teal-600 font-normal hover:cursor-pointer" onClick={() => setIsEditAddress(!isEditAddress)}>
                {isEditAddress ? 'Cancel' : 'Change Address'}
              </span>
            </span>
            {isEditAddress ? null :
              <div className="mb-2">
                <Input type={InputType.Text}
                  name={"Address"} placeholder="Address" value={address}
                  disabled={true}
                />
              </div>
            }
            {isLoaded ? shelter?.address && <Map address={shelter?.address} setAddress={setAddress} isEditAddress={isEditAddress} />
              :
              <div className="animate-pulse rounded-lg">
                <div className="block h-80 w-full bg-zinc-200">
                </div>
              </div>
            }

          </div>

          <div className="col-span-5 md:col-span-3">
            <Input type={InputType.Text}
              name={"Description"} placeholder="Description" label="Description" value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-span-5 md:col-span-4">
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
            <span className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Images</span>
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
