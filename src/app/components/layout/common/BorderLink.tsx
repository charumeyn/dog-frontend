import { IconChevronRight } from "../Icons";

type BorderLinkProps = {
  url: string;
  text: string;
  fullWidth?: boolean;
  withArrow?: boolean;
  containerClasses?: string;
}

const BorderLink: React.FunctionComponent<BorderLinkProps> = ({ text, url, fullWidth, withArrow, containerClasses }) => {
  return (
    <div className={containerClasses ? containerClasses : ""}>
      <a
        href={url}
        className={`${fullWidth ? "w-full inline-block text-center" : "inline-block"} border border-zinc-500 text-zinc-700 items-center gap-x-2 rounded-full px-6 py-3 font-medium shadow-sm`}>
        <div className="flex">
          {text}
          {withArrow ? <IconChevronRight /> : null}
        </div>
      </a>
    </div>
  )
}

export default BorderLink;