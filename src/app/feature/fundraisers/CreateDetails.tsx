import { RecipientType } from "@/app/types/enum/recipientType.enum";

type CreateDetailsProps = {
  goalAmount: number;
  setGoalAmount: (goalAmount: number) => void;
  startDate: Date | undefined;
  setStartDate: (startDate: Date) => void;
  endDate: Date | undefined;
  setEndDate: (endDate: Date) => void;
}
const CreateDetails: React.FunctionComponent<CreateDetailsProps> = ({ goalAmount, setGoalAmount, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="px-6 py-6">
      <h3 className="text-gray-700 mb-2">Who are you fundraising for?</h3>
      <div className="grid grid-cols-3 gap-x-2">
        <input
          id="goalAmount"
          type="number"
          name="cogoalAmountuntry"
          value={goalAmount}
          onChange={(e: any) => setGoalAmount(Number(e.target.value))}
          className="border border-gray-300 px-3 py-2 rounded-lg"
        />
      </div>

      <h3 className="text-gray-700 mb-2 mt-6">What describes the purpose of your fundraising intiative?</h3>
      <div className="flex gap-x-2">

      </div>

      <h3 className="text-gray-700 mb-2 mt-6">Where are you located?</h3>

    </div>
  )
}

export default CreateDetails;