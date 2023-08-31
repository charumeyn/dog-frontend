"use client"

import { useAccount, useLogout } from "@/app/hooks/api/useAuth";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Container, { ContainerType } from "./Container";
import { User, UserType } from "@/app/types/user.interface";
import DropdownMenu from "./common/DropdownMenu";
import { IconChevronDown, IconHorizontalDots } from "./Icons";

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
  const onLogoutSuccess = useCallback(() => router.push("/login"), [])
  const onLogoutError = () => console.log("error logging out")

  const { mutate: logout } = useLogout(onLogoutSuccess, onLogoutError);

  const shelterMenu = [
    { label: "Dogs", url: "/account/dogs" },
    { label: "Fundraisers", url: "/account/fundraisers" },
    { label: "Edit Shelter", url: "/account/shelter" },
    { label: "Edit Profile", url: "/account/edit" },
    { label: "Logout", onClick: () => logout() },
  ];

  const userMenu = [
    { label: "Home", url: "/account" },
    { label: "My Donations", url: "/account/donations" },
    { label: "My Fundraisers", url: "/account/fundraisers" },
    { label: "My Dogs", url: "/account/dogs" },
    { label: "Edit Profile", url: "/account/edit" },
    { label: "Logout", onClick: () => logout() },
  ];

  return (
    <div className="flex border-l border-zinc-200 ">
      {account.type === UserType.Shelter ?
        <div className="flex items-center gap-3 pl-5">
          <img src={account?.shelter.mainImage} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
          <p className="flex flex-col">
            <span className="text-orange-700 text-xs font-medium">Shelter</span>
            <a href="/account/dogs">{account?.shelter.name}</a>
          </p>
          <DropdownMenu
            menuItems={shelterMenu}
            icon={
              <IconChevronDown
                className="h-8 w-8 p-1.5 rounded-full text-zinc-600"
                aria-hidden="true"
              />
            }
          />
        </div>
        :
        <div className="flex items-center gap-3 pl-5">
          <p className="flex flex-col">
            <a href="/account">Hi, {account?.firstName}!</a>
          </p>
          <DropdownMenu
            menuItems={userMenu}
            icon={
              <IconChevronDown
                className="h-8 w-8 p-1.5 rounded-full text-zinc-600"
                aria-hidden="true"
              />
            }
          />
        </div>
      }
    </div>
  )
}