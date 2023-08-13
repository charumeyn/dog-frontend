import { ReactNode } from "react";

export enum ContainerType {
  SingleColumn = "SingleColumn",
  ImageWithContent = "ImageWithContent"
}

type Container = {
  withBg?: boolean;
  className?: string;
  type?: ContainerType;
  mainContent: ReactNode;
  imageContent?: ReactNode;
}

const Container: React.FunctionComponent<Container> = ({ mainContent, imageContent, withBg, type, className }) => {

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

        {type === ContainerType.ImageWithContent ?
          <div className="flex gap-x-8">
            <div className="w-3/5">
              {imageContent}
            </div>
            <div className="w-2/5">
              {mainContent}
            </div>
          </div> : null}

      </div>
    </div>
  )
}

export default Container;