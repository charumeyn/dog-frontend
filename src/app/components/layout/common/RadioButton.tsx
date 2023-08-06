import { PaymentGateway } from "@/app/types/enum/paymentGateway.enum";

type RadioButtonProps = {
  value: string;
  selected?: string;
  setSelected: (e: any) => void;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({ value, selected, setSelected }) => {
  return (
    <div key={value} className="flex items-center">
      <input
        id={value}
        name={value}
        type="radio"
        checked={value === selected}
        className="h-4 w-4 border-neutral-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
        onChange={() => setSelected(value)}
      />
      <label htmlFor={value} className="ml-3 block text-sm font-medium leading-6 text-neutral-900 cursor-pointer">
        {value === PaymentGateway.Stripe ? "Debit or Credit Card" : value}
      </label>
    </div>
  )
}

export default RadioButton;