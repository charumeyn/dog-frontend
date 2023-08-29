"use client"

import { MenuUser } from "@/app/feature/account/MenuUser";
import { ReactNode } from "react";

type AccountContainerProps = {
  mainContent: ReactNode;
  currentPage: string;
}

const AccountContainer: React.FunctionComponent<AccountContainerProps> = ({ mainContent, currentPage }) => {

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 my-14">
      <div className="flex min-h-full flex-col">
        <div className="mx-auto flex w-full items-start gap-x-10">
          <aside className="hidden w-56	shrink-0 lg:block">
            <MenuUser currentPage={currentPage} />
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