import { RecipientType } from "@/app/types/enum/recipientType.enum";

type CreatePurposeProps = {
  purpose: string;
  setPurpose: (purpose: string) => void;
  type: string;
  setType: (type: RecipientType) => void;
  country: string;
  setCountry: (countru: string) => void;
}
const CreatePurpose: React.FunctionComponent<CreatePurposeProps> = ({ purpose, setPurpose, type, setType, country, setCountry }) => {

  const purposes = ["Emergency", "Monthly Bills", "Memorial", "Medical"]

  return (
    <div className="px-6 py-6">
      <h3 className="text-gray-700 mb-2">Who are you fundraising for?</h3>
      <div className="grid grid-cols-3 gap-x-2">
        {Object.entries(RecipientType).map((text, i) =>
          <label htmlFor={text[1]} key={i}
            className={`${type == text[1] ? "border-teal-600 text-teal-600" : "hover:border-gray-500 hover:text-gray-700"} 
              font-medium rounded-lg text-center border-2 hover:cursor-pointer py-5 border-gray-300 text-gray-500`}>
            <input
              id={text[1]}
              type="radio"
              name={text[1]}
              value={text[1]}
              onChange={() => setType(text[1])}
              checked={type == text[1]}
              className="hidden peer"
            />
            {text[0] === "User" ? "Household" : text[0]}
          </label>
        )}
      </div>

      <h3 className="text-gray-700 mb-2 mt-6">What describes the purpose of your fundraising intiative?</h3>
      <div className="flex gap-x-2">
        {purposes.map((text, i) =>
          <span key={i} onClick={() => setPurpose(text)}
            className={`${text === purpose ? "border-teal-600 text-teal-600" : "hover:border-gray-500 hover:text-gray-700"} 
              border px-4 py-2 rounded-full hover:cursor-pointer border-gray-300 text-gray-500`}>
            {text}
          </span>
        )}
      </div>

      <h3 className="text-gray-700 mb-2 mt-6">Where are you located?</h3>
      <input
        id="country"
        type="text"
        name="country"
        value={country}
        onChange={(e: any) => setCountry(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-lg"
      />
    </div>
  )
}

export default CreatePurpose;