"use client"

import Button from "@/app/components/layout/common/Button";
import Heading from "@/app/components/layout/common/Heading";
import Input, { InputType } from "@/app/components/layout/common/Input";
import { useLogin } from "@/app/hooks/api/useAuth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function LoginContent() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.push(`/`)
  }, []);

  const onError = useCallback((error: any) => {
    console.log("onError", error)
  }, []);

  const { mutate: login } = useLogin(onSuccess, onError);

  const submit = useCallback((e: any) => {
    e.preventDefault();

    login({ email, password })
  }, [email, password])


  return (
    <div className="bg-white px-8 py-14 rounded-lg">

      <Heading type={"h3"} text={"Welcome Back!"} className="font-normal text-center mb-2" />
      <Heading type={"h1"} text={"Log in to Doggos Life"} className="!text-3xl !font-bold mb-6 text-center" />

      <form className="flex flex-col gap-4 max-w-xl mx-auto">
        <Input type={InputType.Email} name="email" placeholder="Email" required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input type={InputType.Password} name="password" placeholder="Password" required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" content="Login" onClick={submit} classNames="w-full" />
      </form>

      <p className="text-center mt-14 text-zinc-500">
        Don't have an account?{' '}
        <a href="/register" className="text-teal-600 underline">Register</a>
      </p>
    </div>
  )
}