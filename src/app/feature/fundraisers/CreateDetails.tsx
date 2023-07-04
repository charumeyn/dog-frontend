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
  closeGoalReached: boolean;
  setCloseGoalReached: (closeGoalReached: boolean) => void;
}
const CreateDetails: React.FunctionComponent<CreateDetailsProps> = ({ goalAmount, setGoalAmount, startDate, setStartDate, endDate, setEndDate, closeGoalReached, setCloseGoalReached }) => {
  return (
    <div className="px-6 py-6">
      <h3 className="text-gray-700 mb-2">Enter the goal amount</h3>
      <div className="grid grid-cols-3 gap-x-2">
        <input
          id="goalAmount"
          type="text"
          name="goalAmount"
          value={goalAmount}
          onChange={(e: any) => setGoalAmount(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg"
        />
      </div>

      <h3 className="text-gray-700 mb-2 mt-6">When do you want this fundraiser to run?</h3>
      <div className="flex gap-x-2">
        <div className="flex flex-col">
          <span className="text-gray-500">Start Date</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            className="border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">End Date</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            className="border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>
      </div>

      {/* <label htmlFor="closeGoalReached" className="mt-6 text-gray-700 flex gap-x-2 items-center hover:cursor-pointer">
        <input
          id="closeGoalReached"
          type="checkbox"
          name="closeGoalReached"
          onChange={() => setCloseGoalReached(!closeGoalReached)}
          checked={closeGoalReached}
          className="border border-gray-100 pr-4 w-4 h-4 accent-teal-600"
        />
        End fundraising when goal has been reached
      </label> */}

    </div >
  )
}

export default CreateDetails;