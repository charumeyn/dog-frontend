"use client"

import { MenuUser } from "@/app/feature/account/MenuUser";
import { useAccount } from "@/app/hooks/api/useAuth";
import { ReactNode } from "react";

type AccountContainerProps = {
  mainContent: ReactNode;
}

const AccountContainer: React.FunctionComponent<AccountContainerProps> = ({ mainContent }) => {

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      <div className="flex min-h-full flex-col">
        <div className="mx-auto flex w-full items-start gap-x-8">
          <aside className="hidden w-60	shrink-0 lg:block">
            <MenuUser />
          </aside>

          <main className="flex-1">
            {mainContent}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AccountContainer;