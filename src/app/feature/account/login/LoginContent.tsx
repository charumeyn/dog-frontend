"use client"

import Button from "@/app/components/layout/common/Button";
import Heading from "@/app/components/layout/common/Heading";
import Input, { InputType } from "@/app/components/layout/common/Input";
import { useLogin } from "@/app/hooks/api/useAuth";
import { SuccessResult } from "@/app/types/apiResult";
import { User, UserType } from "@/app/types/user.interface";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function LoginContent() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string[]>([])

  const router = useRouter();

  const onSuccess = useCallback((data: SuccessResult<User>) => {
    router.push(`/`)
  }, []);

  const onError = useCallback((error: any) => {
    setError(error.message)
  }, [setError])

  const { mutate: login, isLoading } = useLogin(onSuccess, onError);

  const submit = useCallback((e: any) => {
    e.preventDefault();

    login({ email, password })
  }, [email, password])


  return (
    <div className="bg-white px-8 py-14 rounded-lg">

      <Heading type={"h3"} text={"Welcome Back!"} className="font-normal text-center mb-2" />
      <Heading type={"h1"} text={"Log in to Doggos Life"} className="!text-2xl md:!text-3xl !font-bold mb-6 text-center" />

      <form className="flex flex-col gap-4 max-w-xl mx-auto">
        <Input type={InputType.Email} name="email" placeholder="Email" required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input type={InputType.Password} name="password" placeholder="Password" required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={submit} content={isLoading ? "Logging in..." : "Login"} disabled={isLoading} />
      </form>

      <p className="text-center mt-14 text-zinc-500">
        Don't have an account?<br />
        Register for a <a href="/register" className="text-teal-600 underline">user account</a> or <a href="/register-shelter" className="text-teal-600 underline">shelter account</a>
      </p>
    </div>
  )
}