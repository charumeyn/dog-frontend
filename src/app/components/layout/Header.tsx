"use client"

import { useAccount, useLogout } from "@/app/hooks/api/useAuth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type HeaderProps = {
}

const Header: React.FunctionComponent<HeaderProps> = ({ }) => {

  const router = useRouter();

  const { data: account } = useAccount();

  const onLogoutSuccess = () => router.push("/login")
  const onLogoutError = () => console.log("error logging out")

  const { mutate: logout } = useLogout(onLogoutSuccess, onLogoutError);

  // const logoutButton = useCallback((e: any) => {
  //   e.preventDefault();
  //   logout()
  // }, [])


  const menu = [
    {
      name: 'Dogs',
      url: '/dogs'
    },
    {
      name: 'Fundraisers',
      url: '/fundraisers'
    }]


  // const logout = async () => {
  //   await fetch("http://localhost:3000/users/logout", {
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include'
  //   })

  //   await router.push('/login')
  // }



  return (
    <div className="shadow-xl">
      <div className="flex justify-between w-full max-w-screen-2xl mx-auto px-4">
        <div className="text-teal-600 py-5 text-2xl font-extrabold">Doggo&apos;s Life</div>
        <div className="flex">
          {menu.map((item: any, i: number) =>
            <a className="px-8 py-5" key={i} href={item.url}>{item.name}</a>
          )}
          {account ? <span onClick={() => logout()}>Logout</span> : <a className="border-l border-gray-200 py-5 px-8" href="/login">Login</a>}

          <br />

          {JSON.stringify(account)}
        </div>
      </div>
    </div>
  )
}

export default Header;