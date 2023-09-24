"use client"

import Button from "@/app/components/layout/common/Button";
import Input, { InputType } from "@/app/components/layout/common/Input";
import { useAccount, useRegister } from "@/app/hooks/api/useAuth";
import { SuccessResult } from "@/app/types/apiResult";
import { User, UserType } from "@/app/types/user.interface";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function RegisterShelterContent() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const onRegisterSuccess = useCallback((data: SuccessResult<User>) => {
    if (data.success) {
      router.push(`/register-shelter/details?userId=${data.data.id}`)
    }
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

    register({ firstName, lastName, email, password, type: UserType.Shelter })
  }, [firstName, lastName, email, password])


  return (
    <div className="bg-white p-8 rounded-lg">
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
        <Button type="submit" onClick={submit} content={"Continue"} />
      </form>
    </div>
  )
}
