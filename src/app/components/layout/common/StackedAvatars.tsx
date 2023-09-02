import ButtonLink from "./ButtonLink";

type StackedAvatarsProps = {
  images?: string[];
  text: string;
  url?: string;
  onClick?: () => void;
}

const StackedAvatars: React.FunctionComponent<StackedAvatarsProps> = ({ text, url, onClick }) => {

  const images = [
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"]

  return (
    <div className="flex items-center gap-x-3 hover:cursor-pointer">
      <div className="flex -space-x-2 overflow-hidden">
        {images.map((image, i) => (
          <img
            key={i}
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src={image}
            alt=""
          />
        ))}
      </div>
      <div>
        {url ? <a href={url}>{text}</a> : onClick ? <span className="text-sm text-zinc-500" onClick={onClick}>{text}</span> : text}
      </div>
    </div>
  )
}

export default StackedAvatars;