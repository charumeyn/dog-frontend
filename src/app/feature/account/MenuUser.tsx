import { IconClose, IconDog, IconDog2, IconDonation, IconFundraiser, IconHome, IconProfile } from "@/app/components/layout/Icons";
import ButtonLink from "@/app/components/layout/common/ButtonLink";
import Heading from "@/app/components/layout/common/Heading";
import { useAccount } from "@/app/hooks/api/useAuth";
import { UserType } from "@/app/types/user.interface";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export function MenuUser({ currentPage }: { currentPage: string }) {

  const { data: account } = useAccount();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const params = useParams()

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
        { name: 'Edit Account', href: '/account/edit', icon: IconDonation, menuPage: 'edit' },
      ]
    }
  }, [])

  return (
    <div>
      <Heading type="h3" text="Dashboard" className="mb-4" />
      <ul role="list" className="-mx-2 space-y-1 mb-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.menuPage === currentPage
                  ? 'font-semibold'
                  : 'hover:bg-zinc-50',
                'group flex items-center gap-x-4 rounded-md p-2 text-lg leading-6 text-zinc-900'
              )}
            >
              <item.icon
                className={classNames(
                  item.icon === IconProfile ? 'h-6 w-6 shrink-0' : 'h-6 w-6 shrink-0',
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
