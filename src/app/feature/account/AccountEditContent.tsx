"use client"

import { IconCheck } from "@/app/components/layout/Icons"
import Alert from "@/app/components/layout/common/Alert"
import Button from "@/app/components/layout/common/Button"
import Heading from "@/app/components/layout/common/Heading"
import Input, { InputType } from "@/app/components/layout/common/Input"
import { useAccount, useUpdateUser } from "@/app/hooks/api/useAuth"
import { useCallback, useEffect, useState } from "react"

export default function AccountEditContent() {

  const { data: account } = useAccount()

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string[]>([])

  useEffect(() => {
    if (account?.firstName && account.lastName) {
      setFirstName(account.firstName)
      setLastName(account.lastName)
    }
  }, [account, setFirstName, setLastName])

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
      update({ id: account?.id, firstName, lastName })
    }
  }, [account, firstName, lastName])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="Edit Account" />
      </div>

      <form onSubmit={onSubmit}>
        <Alert type="error" message={error} setMessage={setError} />

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg divide-y divide-gray-300 px-8 py-6">

          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
              <Input type={InputType.Text}
                label={"First Name"}
                name={"firstName"}
                value={firstName}
                placeholder={"First Name"}
                onChange={(e: any) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input type={InputType.Text}
                label={"Last Name"}
                name={"lastName"}
                value={lastName}
                placeholder={"Last Name"}
                onChange={(e: any) => setLastName(e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input type={InputType.Text}
                label={"Email"}
                name={"email"}
                value={account?.email}
                disabled={true}
              />
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