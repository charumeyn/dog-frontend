interface ButtonType {
}

type ButtonProps = {
  type: "button" | "submit"
  text: string;
  classNames?: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({ type, text, classNames, disabled, onClick }) => {
  return (
    <button
      type={type}
      className={`${disabled ? "bg-zinc-300" : "hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 bg-teal-600"} w-full items-center gap-x-2 rounded-md  px-3.5 py-3.5 font-semibold text-white shadow-sm ${classNames ? classNames : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button;