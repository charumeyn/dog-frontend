import Heading from "@/app/components/layout/common/Heading";
import { User } from "@/app/types/user.interface";

export default function UserHomeContent({ account }: { account: User }) {

  return (
    <div className="mx-auto flex w-full items-start gap-x-8">
      <main className="flex-1">
        <DiaryFeed />
      </main>
      <aside className="hidden w-60	shrink-0 lg:block">
        <FavoritesList />
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

function FavoritesList() {
  return (
    <div>
      <Heading type={"h2"} text={"My Favorite Dogs"} />

    </div>
  )
}

