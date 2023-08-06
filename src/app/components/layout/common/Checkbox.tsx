type CheckboxProps = {
  name: string;
  label: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({ label, name, isChecked, setIsChecked }) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        id={name}
        aria-describedby={name}
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-neutral-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      <label htmlFor={name} className="block text-sm leading-6 text-neutral-900 cursor-pointer">
        {label}
      </label>
    </div>
  )
}

export default Checkbox;