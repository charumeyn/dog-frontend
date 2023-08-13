import { User } from "@/app/types/user.interface";

type AccountContentProps = {
  account: User | undefined;
}

const AccountContent: React.FunctionComponent<AccountContentProps> = ({ account }) => {

  return (
    <main>
      <section className="py-16">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="max-w-4xl">
            <p className="mb-2 text-zinc-500 text-sm">Created by</p>
            <div className="border border-zinc-100 rounded-lg px-5 py-5 mb-8">
              <p className="text-sm">{account?.firstName}</p>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

export default AccountContent;