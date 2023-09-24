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
        className={`${fullWidth ? "w-full inline-block text-center" : "inline-block"} text-sm border border-zinc-200 text-teal-600 items-center gap-x-2 rounded-full pl-6 pr-5 py-3 font-medium shadow-sm`}>
        <div className="flex items-center gap-1">
          {text}
          {withArrow ? <IconChevronRight className="w-4 h-4" /> : null}
        </div>
      </a>
    </div>
  )
}

export default BorderLink;