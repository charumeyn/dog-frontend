export enum InputType {
  Text = "text",
  Email = "email",
  Number = "number",
  Password = "password"
}

type InputProps = {
  type: InputType;
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}

const Input: React.FunctionComponent<InputProps> = ({ name, label, type, placeholder, value, onChange, disabled }) => {
  return (
    <div>
      {label ?
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-zinc-900">
          {label}
        </label> : null
      }
      <div className="mt-2">
        <input
          type={type}
          name={name}
          value={value}
          id={name}
          className={`${disabled ? "text-zinc-400 bg-gray-100 ring-zinc-300" : "text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400"} block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6`}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default Input;