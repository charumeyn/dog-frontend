import { ReactNode } from "react";

export enum ContainerType {
  SingleColumn = "SingleColumn",
  LeftSidebar = "LeftSidebar",
  LeftRightSidebar = "LeftRightSidebar"
}

type Container = {
  withBg?: boolean;
  className?: string;
  type?: ContainerType;
  mainContent: ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

const Container: React.FunctionComponent<Container> = ({ mainContent, leftContent, rightContent, withBg, type, className }) => {

  return (
    <div className={`
        ${withBg ? "bg-zinc-300" : ""} 
        ${className ? className : ""}
    `}>
      <div className="w-full max-w-screen-xl mx-auto px-4">

        {type === ContainerType.SingleColumn ?
          <div>
            {mainContent}
          </div> : null}

        {type === ContainerType.LeftRightSidebar ?
          <div className="flex min-h-full flex-col">
            <div className="mx-auto flex w-full items-start gap-x-8">
              <aside className="hidden w-60	shrink-0 lg:block">
                {leftContent}
              </aside>

              <main className="flex-1">
                {mainContent}
              </main>

              <aside className="hidden w-52 shrink-0 xl:block">
                {rightContent}
              </aside>
            </div>
          </div>
          : null}
      </div>
    </div>
  )
}

export default Container;