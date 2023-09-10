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
    },
    {
      name: 'Doggo Diaries',
      url: '/posts'
    }
  ]

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
            <a href="/" className="text-teal-600 hover:text-teal-700 py-5 text-2xl font-extrabold">Doggo&apos;s Life</a>
            <div className="flex items-center">
              {menu.map((item: any, i: number) =>
                <a className="px-8 py-5 hover:text-teal-600 font-medium" key={i} href={item.url}>{item.name}</a>
              )}
            </div>
            <div className="flex">
              {isLoading ? null :
                isLoggedIn && account ?
                  <Username account={account} />
                  :
                  null
              }
              {!isLoggedIn ? <a className="border-l border-zinc-200 py-5 px-8" href="/login">Login</a> : null}
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
    <>
      <div className="flex items-center text-sm pr-5">
        {account.type === UserType.Shelter ?
          <a className="text-teal-600 hover:border-b hover:border-teal-600" href="/posts/create">+ Create Post</a> :
          <a className="text-teal-600 hover:border-b hover:border-teal-600" href="/fundraisers/create">+ Create Fundraiser</a>
        }
      </div>
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
            <p className="flex items-center gap-3">
              <img src={account?.image} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
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
    </>
  )
}