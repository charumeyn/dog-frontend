"use client"

import Button from "@/app/components/layout/common/Button";
import Input, { InputType } from "@/app/components/layout/common/Input";
import Notice from "@/app/components/layout/common/Notice";
import S3Uploader from "@/app/components/libraries/S3Uploader";
import { useAccount, useLogout, useRegister } from "@/app/hooks/api/useAuth";
import { useCreateShelter } from "@/app/hooks/api/useShelters";
import { SuccessResult } from "@/app/types/apiResult";
import { Shelter } from "@/app/types/shelter.interface";
import { UserType } from "@/app/types/user.interface";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Map } from "@/app/feature/shelters/Maps"

export default function RegisterShelterDetailsContent({ userId }: { userId: number }) {
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>('')

  const router = useRouter();

  const onRegisterSuccess = useCallback((data: SuccessResult<Shelter>) => {
    if (data.success) {
      router.push(`/login`)
    }
  }, []);

  const onRegisterError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { data: account } = useAccount()

  const isInComplete = useMemo(() => {
    if (account && account.id) {
      if (account?.type === UserType.Shelter && account?.shelter === null) {
        return true
      }
    }
  }, [account])

  const { mutate: createShelter, isLoading: isCreatingShelter } = useCreateShelter(onRegisterSuccess, onRegisterError)

  const onLogoutSuccess = useCallback(() => router.push("/login"), [])
  const onLogoutError = () => console.log("error logging out")

  const { mutate: logout, isLoading: isLoggingOut } = useLogout(onLogoutSuccess, onLogoutError);

  const { isLoaded } = useLoadScript({
    //@ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  })

  const submit = useCallback((e: any) => {
    e.preventDefault();

    console.log({ name, description, content, images, mainImage, userId, address, phone })

    createShelter({ name, description, content, images, mainImage, userId, address, phone })
  }, [name, description, content, images, mainImage, userId])


  return (
    <>
      {isLoggingOut ?
        <div className="bg-white px-10 py-10 text-zinc-500 text-center">Logging out...</div> :
        <>
          {isInComplete ?
            <div className="mb-4">
              <Notice>
                Hello, {account?.firstName}! Please complete your registration as a shelter account to continue using the site. You may also <span className="underline hover:cursor-pointer" onClick={() => logout()}>log out</span>.
              </Notice>
            </div>
            : null}

          <div className="bg-white p-8 rounded-lg">

            <form className="grid gap-5">
              <Input type={InputType.Text}
                name={"name"} label="Shelter Name" placeholder="Shelter Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input type={InputType.Text}
                name={"phone"} label="Phone" placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input type={InputType.Text}
                name={"description"} label="Description" placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <div>
                <span className="block text-sm font-medium leading-6 text-zinc-900">Address</span>
                {isLoaded ? <Map address={address} setAddress={setAddress} isEditAddress={true} />
                  :
                  <div className="animate-pulse rounded-lg">
                    <div className="block h-80 w-full bg-zinc-200">
                    </div>
                  </div>
                }
              </div>

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

              <Button type="submit" onClick={submit} content={isCreatingShelter ? "Completing Registration..." : "Register"} />
            </form>
          </div>
        </>}
    </>
  )
}
