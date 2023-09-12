import { FundraiserStatus } from "@/app/types/enum/fundraiserStatus.enum";

type SelectedFiltersProps = {
  limit: number;
  setLimit: (limit: number) => void;
  status?: FundraiserStatus | undefined;
  setStatus: (status: FundraiserStatus | undefined) => void;
}

const SelectedFilters: React.FunctionComponent<SelectedFiltersProps> = ({
  limit, setLimit, status, setStatus
}) => {

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-2 border border-l-0 border-r-0 border-zinc-200 mb-8 text-sm md:text-sm">
      <div className="flex items-center gap-2">
        <div className="hidden md:inline text-zinc-500 border-r border-zinc-200 py-2 pr-6">Filter by status</div>
        <div className="flex gap-2">
          {Object.values(FundraiserStatus).map((x) => (
            <div className="flex gap-2 items-center">
              <input
                id={x}
                name={x}
                type="radio"
                className="h-4 w-4 rounded-full border-zinc-300 text-teal-600 focus:ring-teal-600 cursor-pointer peer hidden"
                onChange={() => setStatus(x)}
                checked={x === status}
              />
              <label htmlFor={x} className={`${x === status ? "font-medium text-white bg-teal-600" : "text-zinc-700 hover:text-teal-600"} block leading-6  cursor-pointer capitalize rounded-full px-3 md:px-4 py-1.5 hover:cursor-pointer`}>
                {x.split("_").join(" ")}
              </label>
            </div>
          ))}
          <div className={`${undefined === status ? "font-medium text-white bg-teal-600" : "text-zinc-700 hover:text-teal-600"} block leading-6  cursor-pointer capitalize rounded-full px-3 md:px-4 py-1.5 hover:cursor-pointer`}
            onClick={(e: any) => {
              e.preventDefault()
              setStatus(undefined)
            }}>
            Any
          </div>
        </div>
      </div>
      <select
        name="limit"
        id="limit"
        value={limit}
        onChange={(e: any) => setLimit(e.target.value)}
        className="hidden md:inline border border-zinc-200 rounded-md text-sm text-zinc-600"
      >
        <option value={4}>4</option>
        <option value={10}>10</option>
        <option value={100}>100</option>
      </select>
    </div>
  )
}

export default SelectedFilters;