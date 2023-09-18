import { IconDog2, IconDonation, IconFundraiser, IconHome, IconProfile } from "@/app/components/layout/Icons";
import Heading from "@/app/components/layout/common/Heading";
import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import { useMemo } from "react";

export function MenuUser({ currentPage }: { currentPage: string }) {

  const { data: account } = useAccount();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const navigation = useMemo(() => {
    if (account?.type === UserType.User) {
      return [
        { name: 'Home', href: '/account', icon: IconHome, menuPage: 'home' },
        { name: 'My Donations', href: '/account/donations', icon: IconDonation, menuPage: 'donations' },
        { name: 'My Fundraisers', href: '/account/fundraisers', icon: IconFundraiser, menuPage: 'fundraisers' },
        { name: 'My Dogs', href: '/account/dogs', icon: IconDog2, menuPage: 'dogs' },
        { name: 'Edit Profile', href: '/account/edit', icon: IconProfile, menuPage: 'edit' },
      ]
    } else {
      return [
        { name: 'Dogs', href: '/account/dogs', icon: IconDog2, menuPage: 'dogs' },
        { name: 'Fundraisers', href: '/account/fundraisers', icon: IconFundraiser, menuPage: 'fundraisers' },
        { name: 'Edit Shelter', href: '/account/shelter', icon: IconDonation, menuPage: 'shelter' },
        { name: 'Edit Profile', href: '/account/edit', icon: IconDonation, menuPage: 'edit' },
      ]
    }
  }, [account])

  return (
    <div>
      <Heading type="h3" text="Dashboard" className="mb-4 mt-1" />
      <ul role="list" className="-mx-2 space-y-1 mb-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.menuPage === currentPage
                  ? 'font-semibold text-teal-600 bg-zinc-100'
                  : 'text-zinc-900 hover:bg-zinc-50',
                'group flex items-center gap-x-4 rounded-lg px-4 py-2 text-lg leading-6'
              )}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
