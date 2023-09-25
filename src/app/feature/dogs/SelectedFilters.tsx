import { IconClose, IconFilter } from "@/app/components/layout/Icons";
import { CoatLength } from "@/app/types/enum/coatLength.enum";
import { Color } from "@/app/types/enum/color.enum";
import { Gender } from "@/app/types/enum/gender.enum";
import { Size } from "@/app/types/enum/size.enum";
import { ReactNode, useMemo } from "react";

type SelectedFiltersProps = {
  limit: number;
  setLimit: (limit: number) => void;
  gender?: Gender;
  setGender?: (gender: Gender | undefined) => void;
  size?: Size;
  setSize?: (size: Size | undefined) => void;
  coatLength?: CoatLength,
  setCoatLength?: (coatLength: CoatLength | undefined) => void;
  color?: Color,
  setColor?: (color: Color | undefined) => void;
  isOpenFilter: boolean,
  setIsOpenFilter: (isOpenFilter: boolean) => void;
}

const SelectedFilters: React.FunctionComponent<SelectedFiltersProps> = ({
  limit, setLimit, size, setSize, gender, setGender, coatLength, setCoatLength, color, setColor, setIsOpenFilter
}) => {

  const hasFilterApplied = useMemo(() => {
    return size != undefined || gender != undefined || color != undefined || coatLength != undefined
  }, [size, gender, color, coatLength])

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-2 border border-l-0 border-r-0 border-zinc-200 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">

        <div className="flex justify-between w-full md:w-auto">
          <div className="lg:hidden flex items-center text-zinc-500 hover:text-zinc-600 gap-x-1 text-sm bg-zinc-100 px-2.5 py-2 rounded-lg hover:cursor-pointer hover:bg-zinc-200"
            onClick={() => setIsOpenFilter(true)}>
            <IconFilter className="w-4 h-4" /> Add Filter
          </div>
          <select
            name="limit"
            id="limit"
            value={limit}
            onChange={(e: any) => setLimit(e.target.value)}
            className="border border-zinc-200 rounded-md text-sm text-zinc-600 md:hidden"
          >
            <option value={4}>4</option>
            <option value={10}>10</option>
            <option value={100}>100</option>
          </select>
        </div>

        {hasFilterApplied ?
          <div className="flex items-center justify-start gap-x-1 md:gap-x-3 w-full md:w-auto">
            <FilterCapsule
              color={"orange"}
              children={
                <div>Clear <span className="hidden md:inline">all filter</span></div>
              }
              onClick={() => {
                setColor && setColor(undefined)
                setGender && setGender(undefined)
                setSize && setSize(undefined)
                setCoatLength && setCoatLength(undefined)
              }}
            />
            {size ? <FilterCapsule color={"teal"} children={size} onClick={() => setSize && setSize(undefined)} hasCloseIcon={true} /> : null}
            {gender ? <FilterCapsule color={"teal"} children={gender} onClick={() => setGender && setGender(undefined)} hasCloseIcon={true} /> : null}
            {coatLength ? <FilterCapsule color={"teal"} children={coatLength} onClick={() => setCoatLength && setCoatLength(undefined)} hasCloseIcon={true} /> : null}
            {color ? <FilterCapsule color={"teal"} children={color} onClick={() => setColor && setColor(undefined)} hasCloseIcon={true} /> : null}
          </div>
          :
          <div className="text-zinc-500 text-sm hidden md:inline">No filters applied</div>
        }

      </div>
      <select
        name="limit"
        id="limit"
        value={limit}
        onChange={(e: any) => setLimit(e.target.value)}
        className="border border-zinc-200 rounded-md text-sm text-zinc-600 hidden md:inline"
      >
        <option value={12}>12</option>
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