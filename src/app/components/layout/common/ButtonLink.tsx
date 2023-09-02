type ButtonLinkProps = {
  url: string;
  text: string;
  fullWidth?: boolean;
  classNames?: string;
  color?: string;
}

const Button: React.FunctionComponent<ButtonLinkProps> = ({ text, url, fullWidth, color, classNames }) => {
  return (
    <a
      href={url}
      className={`${fullWidth ? "w-full inline-block text-center" : "inline-block"} ${color ? color : "text-white bg-teal-600 hover:bg-teal-700"} ${classNames ? classNames : ""}  items-center gap-x-2 rounded-md px-6 py-3 font-semibold shadow-sm`}>
      {text}
    </a>
  )
}

export default Button;