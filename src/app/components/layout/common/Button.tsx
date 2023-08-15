import { ReactNode } from "react";

interface ButtonType {
}

type ButtonProps = {
  type: "button" | "submit"
  content: ReactNode;
  classNames?: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
  isFullWidth?: boolean;
  color?: "teal" | "orange";
}

const Button: React.FunctionComponent<ButtonProps> = ({ type, content, classNames, disabled, onClick, isFullWidth, color }) => {
  return (
    <button
      type={type}
      className={`${disabled ? "bg-zinc-300 hover:bg-zinc-300 focus-visible:outline-zinc-300" : "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "} ${isFullWidth ? "w-full" : ""} ${color === "orange" ? "hover:bg-orange-500 bg-orange-600 focus-visible:outline-orange-600" : "hover:bg-teal-500 bg-teal-600 focus-visible:outline-teal-600"} items-center gap-x-2 rounded-md  px-10 py-3.5 font-semibold text-white shadow-sm ${classNames ? classNames : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export default Button;