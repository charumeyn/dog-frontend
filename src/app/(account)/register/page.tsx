"use client";

import { useRegister } from "@/app/hooks/api/useAuth";
import { SuccessResult } from "@/app/types/apiResult";
import { User } from "@/app/types/user.interface";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";

export default function Register() {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const onRegisterSuccess = useCallback(() => {
    router.push('/login');
  }, []);

  const onRegisterError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { mutate: register } = useRegister(onRegisterSuccess, onRegisterError)

  const submit = useCallback((e: any) => {
    e.preventDefault();

    register({ name, email, password })
  }, [name, email, password])


  return (
    <form>
      <input type="text" placeholder="name" required
        onChange={(e) => setName(e.target.value)}
      />
      <input type="email" placeholder="email" required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" placeholder="password" required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={submit}>Register</button>
    </form>
  )
}

