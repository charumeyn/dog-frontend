import Input, { InputType } from "@/app/components/layout/common/Input";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


type CreateDetailsProps = {
  goalAmount: string;
  setGoalAmount: (goalAmount: string) => void;
  startDate: Date | null;
  setStartDate: (startDate: Date | null) => void;
  endDate: Date | null;
  setEndDate: (endDate: Date | null) => void;
}
const CreateDetails: React.FunctionComponent<CreateDetailsProps> = ({ goalAmount, setGoalAmount, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="px-6 py-6">

      <Input
        type={InputType.Number}
        name={"goalAmount"}
        placeholder="Goal amount"
        label="Enter the goal amount"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
      />

      <h3 className="text-zinc-700 mb-2 mt-6">When do you want this fundraiser to run?</h3>
      <div className="flex gap-x-2">
        <div className="flex flex-col">
          <span className="block text-sm font-medium leading-6 text-zinc-900">Start Date</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col">
          <span className="block text-sm font-medium leading-6 text-zinc-900">End Date</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div >
  )
}

export default CreateDetails;