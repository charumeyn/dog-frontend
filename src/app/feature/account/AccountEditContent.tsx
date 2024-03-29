"use client"

import { IconCheck } from "@/app/components/layout/Icons"
import Alert from "@/app/components/layout/common/Alert"
import Button from "@/app/components/layout/common/Button"
import Heading from "@/app/components/layout/common/Heading"
import Input, { InputType } from "@/app/components/layout/common/Input"
import S3Uploader from "@/app/components/libraries/S3Uploader"
import S3UploaderSingle from "@/app/components/libraries/S3UploaderSingle"
import { useAccount, useUpdateUser } from "@/app/hooks/api/useAuth"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function AccountEditContent() {

  const { data: account } = useAccount()

  const router = useRouter();

  useEffect(() => {
    if (account) {
      if (account.id === undefined) {
        router.push("/login")
      }
    }
  }, [account])

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [images, setImages] = useState<string[]>([])
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string[]>([])

  useEffect(() => {
    if (account?.firstName && account.lastName) {
      setFirstName(account.firstName)
      setLastName(account.lastName)
    }
  }, [account, setFirstName, setLastName])

  useEffect(() => {
    if (account?.image) {
      setImages([account?.image])
    }
  }, [account, setImages])

  const onSuccess = useCallback(() => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  }, [setIsSuccess])

  const onError = useCallback((error: any) => {
    setError(error.message)
  }, [setError])

  const { mutate: update, isLoading } = useUpdateUser(onSuccess, onError)

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();

    if (account) {
      update({ id: account?.id, firstName, lastName, image: images[0] })
    }
  }, [account, firstName, lastName])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="Edit Profile" />
      </div>

      <form onSubmit={onSubmit}>
        <Alert type="error" message={error} setMessage={setError} />

        <div className="bg-white px-5 py-4 md:p-8 rounded-lg border border-zinc-200">

          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-4 md:col-span-3">
              <Input type={InputType.Text}
                label={"First Name"}
                name={"firstName"}
                value={firstName}
                placeholder={"First Name"}
                onChange={(e: any) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-span-4 md:col-span-3">
              <Input type={InputType.Text}
                label={"Last Name"}
                name={"lastName"}
                value={lastName}
                placeholder={"Last Name"}
                onChange={(e: any) => setLastName(e.target.value)}
              />
            </div>
            <div className="col-span-4 md:col-span-3">
              <Input type={InputType.Text}
                label={"Email"}
                name={"email"}
                value={account?.email}
                disabled={true}
              />
            </div>

            <div className="col-span-5 md:col-span-3">
              <S3UploaderSingle images={images} setImages={setImages} />
            </div>

            <div className="col-span-5">
              {isSuccess ?
                <Button type={"submit"} color="green" disabled={true} content={<div><IconCheck className="w-5 h-5 inline-block mr-2" /> Saved!</div>} />
                :
                <Button type={"submit"} onClick={(e: any) => onSubmit(e)} content={isLoading ? "Saving..." : "Save"} disabled={isLoading} />
              }
            </div>
          </div>

        </div>
      </form>
    </div>
  )

}