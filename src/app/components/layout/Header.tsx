"use client"

import { useAccount, useLogout } from "@/app/hooks/api/useAuth";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useMemo } from "react";
import Container, { ContainerType } from "./Container";

type HeaderProps = {
}

const Header: React.FunctionComponent<HeaderProps> = ({ }) => {

  const router = useRouter();

  const { data: account, isLoading } = useAccount();

  const onLogoutSuccess = () => router.push("/login")
  const onLogoutError = () => console.log("error logging out")

  const { mutate: logout } = useLogout(onLogoutSuccess, onLogoutError);

  const menu = [
    {
      name: 'Dogs',
      url: '/dogs'
    },
    {
      name: 'Fundraisers',
      url: '/fundraisers'
    }]

  const isLoggedIn = useMemo(() => {
    return account && account?.success;
  }, [account])

  console.log(account)


  return (
    <div className="shadow-xl">
      <Container
        type={ContainerType.SingleColumn}
        className="sticky top-0"
        mainContent={
          <div className="flex justify-between">
            <div className="text-teal-600 py-5 text-2xl font-extrabold">Doggo&apos;s Life</div>
            <div className="flex">
              {menu.map((item: any, i: number) =>
                <a className="px-8 py-5" key={i} href={item.url}>{item.name}</a>
              )}
              {isLoading ? null :
                isLoggedIn ?
                  <>
                    <a className="border-l border-zinc-200 py-5 px-8" href="/account">Hi, {account?.data.first_name}!</a>
                    <span className="py-5 px-8" onClick={() => logout()}>Logout</span>
                  </>
                  :
                  <a className="border-l border-zinc-200 py-5 px-8" href="/login">Login</a>
              }
            </div>
          </div>
        } />
    </div >

  )
}

export default Header;