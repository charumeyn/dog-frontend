import { FundraiserStatus } from "@/app/types/enum/fundraiserStatus.enum";

type SelectedFiltersProps = {
  limit: number;
  setLimit: (limit: number) => void;
  length: number;
}

const SelectedFilters: React.FunctionComponent<SelectedFiltersProps> = ({
  limit, setLimit, length
}) => {

  return (
    <div className="flex justify-between items-center py-2 border border-l-0 border-r-0 border-zinc-200 mb-8 text-sm">
      <div className="text-zinc-500">Showing {length} posts</div>
      <select
        name="limit"
        id="limit"
        value={limit}
        onChange={(e: any) => setLimit(e.target.value)}
        className="border border-zinc-200 rounded-md text-sm text-zinc-600"
      >
        <option value={12}>12</option>
        <option value={40}>40</option>
        <option value={100}>100</option>
      </select>
    </div>
  )
}

export default SelectedFilters;