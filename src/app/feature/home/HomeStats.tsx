const stats = [
  { name: 'Donors', value: '5k' },
  { name: 'Fundraisers', value: '95' },
  { name: 'Shelters', value: '44' },
  { name: 'Sponsored dogs', value: '1.6k' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <dl className="mx-auto grid gap-px bg-gray-900/5 grid-cols-2 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >

          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {stat.value}
          </dd>
          <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
        </div>
      ))}
    </dl>
  )
}