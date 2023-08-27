"use client"

import { useAccount, useLogout } from "@/app/hooks/api/useAuth";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Container, { ContainerType } from "./Container";
import { User, UserType } from "@/app/types/user.interface";
import DropdownMenu from "./common/DropdownMenu";
import { IconHorizontalDots } from "./Icons";

type HeaderProps = {
}

export default function Header() {

  const { data: account, isLoading } = useAccount();
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
    return account && account.id;
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
                isLoggedIn && account ?
                  <Username account={account} />
                  :
                  <a className="border-l border-zinc-200 py-5 px-8" href="/login">Login</a>
              }
            </div>
          </div>
        } />
    </div >

  )
}


function Username({ account }: { account: User }) {

  const router = useRouter();
  const onLogoutSuccess = () => router.push("/login")
  const onLogoutError = () => console.log("error logging out")

  const { mutate: logout } = useLogout(onLogoutSuccess, onLogoutError);

  const menuForPending = [
    { label: "Dashboard", url: "/account" },
    { label: "Dogs", url: "/account/dogs" },
    { label: "Fundraisers", url: "/account/fundraisers" },
    { label: "Donations", url: "/account/donations" },
    { label: "Edit Shelter", url: "/account/edit" },
    { label: "Logout", onClick: () => logout() },
  ];

  return (
    <div className="flex border-l border-zinc-200 ">
      {account.type === UserType.Shelter ?
        <div className="flex items-center gap-3 pl-5">
          <img src={account?.shelter.mainImage} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
          <a className="" href="/account">Hi, {account?.firstName}!</a>
          <DropdownMenu
            menuItems={menuForPending}
            icon={
              <IconHorizontalDots
                className="h-8 w-8 bg-gray-200 p-1.5 rounded-full"
                aria-hidden="true"
              />
            }
          />
        </div>
        :
        <div>
          <a className="" href="/account">Hi, {account?.firstName}!</a>
        </div>
      }

      {/* <span className="" onClick={() => logout()}>Logout</span> */}
    </div>
  )
}