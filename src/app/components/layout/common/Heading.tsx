type HeadingProps = {
  type: "h1" | "h2" | "h3"
  text: string;
  className?: string;
}

const Heading: React.FunctionComponent<HeadingProps> = ({ type, text, className }) => {
  return (
    type === "h1" ? <h1 className={`${className ? className : ""} text-xl font-semibold text-zinc-900`}>{text}</h1> :
      type === "h2" ? <h2 className={`${className ? className : ""} font-semibold text-zinc-900`}>{text}</h2> :
        type === "h3" ? <h3 className={`${className ? className : ""} font-semibold text-zinc-500`}>{text}</h3> : null
  )
}

export default Heading;