"use client"

import Alert from "@/app/components/layout/common/Alert";
import Button from "@/app/components/layout/common/Button";
import Input, { InputType } from "@/app/components/layout/common/Input";
import { useRegister } from "@/app/hooks/api/useAuth";
import { SuccessResult } from "@/app/types/apiResult";
import { User, UserType } from "@/app/types/user.interface";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function RegisterContent() {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string[]>([])

  const router = useRouter();

  const onSuccess = useCallback((data: SuccessResult<User>) => {
    if (data.success) {
      setIsSuccess(true)
      setTimeout(() => {
        router.push(`/login`)
      }, 3000);
    }
  }, [setIsSuccess]);

  const onError = useCallback((error: any) => {
    setError(error.message)
  }, [setError])

  const { mutate: register, isLoading } = useRegister(onSuccess, onError)

  const submit = useCallback((e: any) => {
    e.preventDefault();

    register({ firstName, lastName, email, password, type: UserType.User })
  }, [firstName, lastName, email, password])


  return (
    <div className="bg-white p-8 rounded-lg">
      <Alert type="error" message={error} setMessage={setError} />

      {isSuccess ?
        <div className="text-center">
          <p className="mb-2">Successfully created your account.</p>
          <p>Redirecting you to login page... or click <a className="text-teal-600" href="/login">here</a>.</p>
        </div>
        :
        <form className="grid gap-5">
          <Input type={InputType.Text}
            name={"firstName"} placeholder="First Name" label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input type={InputType.Text}
            name={"lastName"} placeholder="Last Name" label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input type={InputType.Email}
            name={"email"} placeholder="Email" label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input type={InputType.Password} label="Password"
            name={"password"} placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" onClick={submit} content={isLoading ? "Creating account..." : "Register"} disabled={isLoading} />
        </form>
      }
    </div >
  )
}
