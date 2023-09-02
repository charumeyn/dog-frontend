import Heading from "@/app/components/layout/common/Heading";
import { useDog } from "@/app/hooks/api/useDogs";
import { User } from "@/app/types/user.interface";

export default function UserHomeContent({ account }: { account: User }) {

  return (
    <div className="mx-auto flex w-full items-start gap-x-8">
      <main className="flex-1">
        <DiaryFeed />
      </main>
      <aside className="hidden w-60	shrink-0 lg:block">
        <Heading type={"h2"} text={"My Favorite Dogs"} className="!text-zinc-500 mb-5" />
        {account.favoriteDogIds.map((id, i) => (
          <FavoritesRow key={i} id={Number(id)} />
        ))}
      </aside>
    </div>
  )
}


function DiaryFeed() {
  return (
    <div>
      <Heading type={"h1"} text={"Doggo diaries from favorite dogs"} />

    </div>
  )
}

function FavoritesRow({ id }: { id: number }) {

  const { data: dog } = useDog(id)

  return (
    <a href={`/dogs/${dog?.id}`} className="flex items-center gap-4 mb-3 hover:cursor-pointer hover:text-teal-600 font-medium">
      <img src={dog?.mainImage} className="w-14 h-14 rounded-full" />
      <p>{dog?.name}</p>
    </a>
  )
}

