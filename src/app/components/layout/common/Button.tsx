interface ButtonType {
}

type ButtonProps = {
  type: "button" | "submit"
  text: string;
  classNames?: string;
  disabled: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({ type, text, classNames, disabled }) => {
  return (
    <button
      type={type}
      // className={` `
      //   + classNames + disabled && 'bg-neutral'}
      className={`${disabled ? "bg-neutral-400" : "hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600"} w-full items-center gap-x-2 rounded-md  px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;