export enum InputType {
  Text = "text",
  Email = "email",
}

type InputProps = {
  type: InputType;
  name: string;
  label?: string;
  placeholder: string;
  onChange: (e: any) => void;
}

const Input: React.FunctionComponent<InputProps> = ({ name, label, type, placeholder, onChange }) => {
  return (
    <div>
      {label ?
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-neutral-900">
          {label}
        </label> : null
      }
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={name}
          className="block w-full rounded-md border-0 px-3 py-2.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default Input;