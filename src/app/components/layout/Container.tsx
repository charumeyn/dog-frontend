import { ReactNode } from "react";

export enum ContainerType {
  SingleColumn = "SingleColumn",
  NarrowColumn = "NarrowColumn",
  MidColumn = "MidColumn",
  FlushLeft = "FlushLeft",
  ImageWithContent = "ImageWithContent",
  LeftSidebar = "LeftSidebar"
}

type Container = {
  withBg?: boolean;
  className?: string;
  type: ContainerType;
  mainContent: ReactNode;
  imageContent?: ReactNode;
  sidebarContent?: ReactNode;
}

const Container: React.FunctionComponent<Container> = ({ mainContent, imageContent, withBg, type, className, sidebarContent }) => {

  return (
    <div className={`
        ${withBg ? "bg-zinc-100" : ""} 
        ${className ? className : ""}
    `}>
      <div className={`${type === ContainerType.NarrowColumn ? "max-w-xl" : type === ContainerType.MidColumn ? "max-w-2xl" : "max-w-screen-xl"} w-full mx-auto px-4`}>

        {type === ContainerType.SingleColumn || type === ContainerType.NarrowColumn || type === ContainerType.MidColumn ?
          mainContent
          : null}

        {type === ContainerType.ImageWithContent ?
          <div className="flex-col md:flex-row flex gap-x-8 gap-y-6">
            <div className="w-full md:max-w-md lg:max-w-screen-md">
              {imageContent}
            </div>
            <div className="w-full md:w-4/5 lg:w-2/5">
              {mainContent}
            </div>
          </div> : null}

        {type === ContainerType.FlushLeft ?
          <div className="max-w-screen-md mx-auto lg:ml-0 lg:mr-0">{mainContent}</div>
          : null}

        {type === ContainerType.LeftSidebar ?
          <div className="flex items-start gap-x-10">
            <aside className="hidden w-56	shrink-0 lg:block">
              {sidebarContent}
            </aside>

            <main className="flex-1">
              {mainContent}
            </main>
          </div> : null}

      </div>
    </div>
  )
}

export default Container;