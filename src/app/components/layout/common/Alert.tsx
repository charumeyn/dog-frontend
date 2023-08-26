
type AlertProps = {
  type: "error" | "success"
  message: string[];
  setMessage: (message: string[]) => void;
  classNames?: string;
}

const Alert: React.FunctionComponent<AlertProps> = ({ type, message, setMessage, classNames }) => {
  return (
    <div
      className={`${message.length > 0
        ? `transition delay-50 duration-[3000ms] ease-[cubic-bezier(0,1,0,1)] opacity-100 ${classNames ? classNames : ""
        }`
        : "transition delay-50 ease-[cubic-bezier(0,1,0,1)] duration-[3000ms] opacity-0"
        }`}
      onTransitionEnd={() => setMessage([])
      }
    >
      <div className={`
        ${type === "error" ? "bg-red-50" : ""}
        ${type === "success" ? "bg-green-50" : ""}
        ${message.length > 0 ? "px-5 py-3 mb-4 rounded-md" : ""}
      `}>
        <ul role="list" className={`
            ${type === "error" ? "text-red-700" : ""}
            ${type === "success" ? "" : "text-green-600"} 
            space-y-1 text-sm`}>
          {message.map((message) => (
            <li className="">{message}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Alert;