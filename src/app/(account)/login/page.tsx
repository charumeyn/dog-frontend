"use client";

import { useLogin } from "@/app/hooks/api/useAuth";
import { redirect } from 'next/navigation';
import { useCallback, useEffect, useState } from "react";

export default function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (isSuccess) {
      redirect(`/`);
    }
  }, [])

  const onLoginSuccess = useCallback((data: any) => {
    // router.push('/');
    console.log("login", data)
    redirect("/")
  }, []);

  const onLoginError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { mutate: login, isSuccess } = useLogin(onLoginSuccess, onLoginError);

  const submit = useCallback((e: any) => {
    e.preventDefault();

    console.log(email, password)

    login({ email, password })
  }, [email, password])



  return (
    <form className="flex flex-col gap-4 max-w-xl mx-auto">
      <input type="email" placeholder="email" required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" placeholder="password" required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={submit}>Sign in</button>
    </form>
  )
}

