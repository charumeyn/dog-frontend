"use client"

import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { IconChevronDown, IconClose, IconMenu, IconUser } from './Icons'
import { User, UserType } from '@/app/types/user.interface'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useAccount, useLogout } from '@/app/hooks/api/useAuth'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

  const pathName = usePathname();

  const path = useMemo(() => {
    if (pathName.includes('dogs')) {
      return 'dogs'
    } else if (pathName.includes('fundraisers')) {
      return 'fundraisers'
    } else if (pathName.includes('posts')) {
      return 'posts'
    } else return
  }, [pathName])

  const { data: account, isLoading } = useAccount();

  const mainMenu = [
    {
      path: "dogs",
      url: "/dogs",
      label: "Dogs"
    },
    {
      path: "fundraisers",
      url: "/fundraisers",
      label: "Fundraisers"
    },
    {
      path: "posts",
      url: "/posts",
      label: "Doggo Diaries"
    }
  ]

  const router = useRouter();

  useEffect(() => {
    if (account?.type === UserType.Shelter && account?.shelter === null) {
      router.push(`/register-shelter/details?userId=${account?.id}`)
    }
  }, [account])

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <IconClose />
                  ) : (
                    <IconMenu />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/" className="text-teal-600 hover:text-teal-700 py-5 text-2xl font-extrabold">Doggo&apos;s Life</a>
                </div>
                <div className="hidden sm:flex sm:space-x-6 justify-center flex-1">
                  {mainMenu.map((menu) => (
                    <a
                      href={menu.url}
                      className={`${path === menu.path ? "border-teal-500 text-gray-900" : "text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700"} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                    >
                      {menu.label}
                    </a>
                  ))}
                </div>
              </div>
              {account ?
                <Username account={account} /> : null}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {mainMenu.map((menu) => (
                <Disclosure.Button
                  as="a"
                  href={menu.url}
                  className={`${path === menu.path ? "bg-teal-50 border-teal-500 text-teal-700" : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"} block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium`}
                >
                  {menu.label}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}



function Username({ account }: { account: User }) {

  const router = useRouter();
  const onLogoutSuccess = useCallback(() => router.push("/login"), [])
  const onLogoutError = () => console.log("error logging out")

  const { mutate: logout } = useLogout(onLogoutSuccess, onLogoutError);

  const isLoggedIn = useMemo(() => {
    return account && account.id;
  }, [account])

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


  const validAccount = useMemo(() => {
    if (account?.type === UserType.User) {
      return account && account.id;
    } else {
      if (account?.shelter === null) {
        router.push("/register-shelter/details?userId=9")
      }
      else return account && account.id;
    }
  }, [account])

  // useEffect(() => {
  //   if (account?.type === UserType.Shelter && account?.shelter === null) {
  //     router.push("/register-shelter/details?userId=9")
  //   }
  // }, [account])



  return (
    validAccount ?
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button
          type="button"
          className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
        </button>

        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 items-center gap-2 text-zinc-600">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={account.type === UserType.User ? account.image : account.shelter.mainImage}
                alt=""
              />
              <span className="hidden md:flex items-center gap-x-1 text-left">
                {account.type === UserType.User ?
                  <a href="/account">{account?.firstName}</a>
                  :
                  <p className="flex flex-col">
                    <span className="text-orange-700 text-xs font-medium">Shelter</span>
                    <a href="/account/dogs">{account?.shelter.name}</a>
                  </p>
                }
                <IconChevronDown className="w-4 h-4 text-zinc-500" />
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {account.type === UserType.User ?
                userMenu.map((menuItem, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <a
                        onClick={menuItem.onClick}
                        href={menuItem.url}
                        className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} block px-4 py-2 text-sm hover:cursor-pointer`}
                      >
                        {menuItem.label}
                      </a>
                    )}
                  </Menu.Item>
                )) :
                shelterMenu.map((menuItem, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <a
                        onClick={menuItem.onClick}
                        href={menuItem.url}
                        className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} block px-4 py-2 text-sm hover:cursor-pointer`}
                      >
                        {menuItem.label}
                      </a>
                    )}
                  </Menu.Item>
                ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      :
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <a href="/login"
          className="hover:cursor-pointer inline-flex gap-2 items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
          <IconUser /><span className="hidden md:inline">Log in</span>
        </a>
      </div>
  )
}