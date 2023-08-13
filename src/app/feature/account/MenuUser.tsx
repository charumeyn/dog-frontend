import { IconClose, IconDog, IconDog2, IconDonation, IconFundraiser, IconHome, IconProfile } from "@/app/components/layout/Icons";
import ButtonLink from "@/app/components/layout/common/ButtonLink";
import { useAccount } from "@/app/hooks/api/useAuth";

export function MenuUser() {

  const { data: account, isLoading } = useAccount();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const navigation = [
    { name: 'Home', href: '#', icon: IconHome, current: true },
    { name: 'My donations', href: '#', icon: IconDonation, current: false },
    { name: 'My fundraisers', href: '#', icon: IconFundraiser, current: false },
    { name: 'Edit Profile', href: '#', icon: IconProfile, current: false },
    { name: 'Register dog', href: '#', icon: IconDog2, current: false },
  ]

  return (
    <div>
      <h2 className="text-zinc-600 font-medium mb-4">Dashboard</h2>
      <ul role="list" className="-mx-2 space-y-1 mb-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.current
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
      <ButtonLink url={'#'} text={'Create a fundraiser'} />
    </div>
  )
}
