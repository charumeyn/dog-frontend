import { IconClose } from "@/app/components/layout/Icons";
import { useDogs } from "@/app/hooks/api/useDogs";
import { CoatLength } from "@/app/types/enum/coatLength.enum";
import { Color } from "@/app/types/enum/color.enum";
import { Gender } from "@/app/types/enum/gender.enum";
import { Size } from "@/app/types/enum/size.enum";
import { ReactNode, useMemo } from "react";

type SelectedFiltersProps = {
  limit: number;
  setLimit: (limit: number) => void;
  gender?: Gender;
  setGender: (gender: Gender | undefined) => void;
  size?: Size;
  setSize: (size: Size | undefined) => void;
  coatLength?: CoatLength,
  setCoatLength: (coatLength: CoatLength | undefined) => void;
  color?: Color,
  setColor: (color: Color | undefined) => void;
}

const SelectedFilters: React.FunctionComponent<SelectedFiltersProps> = ({
  limit, setLimit, size, setSize, gender, setGender, coatLength, setCoatLength, color, setColor
}) => {

  const hasFilterApplied = useMemo(() => {
    return size != undefined || gender != undefined || color != undefined || coatLength != undefined
  }, [size, gender, color, coatLength])

  return (
    <div className="flex justify-between items-center py-2 border border-l-0 border-r-0 border-zinc-200 mb-8">
      <div>
        {hasFilterApplied ?
          <div className="flex items-center gap-x-3">
            <FilterCapsule
              color={"orange"}
              children={"Clear all filter"}
              onClick={() => {
                setColor(undefined)
                setGender(undefined)
                setSize(undefined)
                setCoatLength(undefined)
              }}
            />
            {size && setSize ? <FilterCapsule color={"teal"} children={size} onClick={() => setSize(undefined)} hasCloseIcon={true} /> : null}
            {gender && setGender ? <FilterCapsule color={"teal"} children={gender} onClick={() => setGender(undefined)} hasCloseIcon={true} /> : null}
            {coatLength && setCoatLength ? <FilterCapsule color={"teal"} children={coatLength} onClick={() => setCoatLength(undefined)} hasCloseIcon={true} /> : null}
            {color && setColor ? <FilterCapsule color={"teal"} children={color} onClick={() => setColor(undefined)} hasCloseIcon={true} /> : null}
          </div>
          :
          <div className="text-zinc-500 text-sm">No filters applied</div>
        }

      </div>
      <select
        name="limit"
        id="limit"
        value={limit}
        onChange={(e: any) => setLimit(e.target.value)}
        className="border border-zinc-200 rounded-md text-sm text-zinc-600"
      >
        <option value={10}>10</option>
        <option value={40}>40</option>
        <option value={100}>100</option>
      </select>
    </div>
  )
}

export default SelectedFilters;

export function FilterCapsule(
  { color, children, onClick, hasCloseIcon }:
    { color: string, children: ReactNode, onClick: (e: any) => void, hasCloseIcon?: boolean }
) {
  return (
    <div className={`
      ${color === "orange" ? "bg-orange-100 text-orange-600" : ""} 
      ${color === "teal" ? "bg-teal-100 text-teal-600" : ""} 
      rounded-full px-3.5 py-1 font-medium text-xs h-7 flex items-center hover:cursor-pointer hover:opacity-80`}
    >
      {hasCloseIcon ?
        <div className="flex gap-x-1 items-center">{children}<span onClick={onClick}><IconClose className="w-4 h-4" /></span></div>
        : <span onClick={onClick}>{children}</span>
      }
    </div>
  )
}