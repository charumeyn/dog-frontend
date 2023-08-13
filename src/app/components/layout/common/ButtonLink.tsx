interface ButtonType {
}

type ButtonLinkProps = {
  url: string;
  text: string;
  fullWidth?: boolean;
  classNames?: string;
}

const Button: React.FunctionComponent<ButtonLinkProps> = ({ text, url, fullWidth }) => {
  return (
    <a
      href={url}
      className={`${fullWidth ? "w-full" : "inline-block"} bg-teal-600 hover:bg-teal-700 items-center gap-x-2 rounded-md px-6 py-3 font-semibold text-white shadow-sm`}>
      {text}
    </a>
  )
}

export default Button;

      // className="hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 w-full items-center gap-x-2 rounded-md px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm"
