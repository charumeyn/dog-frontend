import { IconClose } from "@/app/components/layout/Icons";
import Heading from "@/app/components/layout/common/Heading";
import { CoatLength } from "@/app/types/enum/coatLength.enum";
import { Color } from "@/app/types/enum/color.enum";
import { Gender } from "@/app/types/enum/gender.enum";
import { Size } from "@/app/types/enum/size.enum";
import { ReactNode, useCallback, useMemo } from "react";

type FilterProps = {
  gender?: Gender;
  setGender?: (gender: Gender) => void;
  size?: Size;
  setSize?: (size: Size) => void;
  coatLength?: CoatLength,
  setCoatLength?: (coatLength: CoatLength) => void;
  color?: Color,
  setColor?: (color: Color) => void;
}

const Filter: React.FunctionComponent<FilterProps> = ({ size, setSize, gender, setGender, coatLength, setCoatLength, color, setColor }) => {

  const bgColor = [
    {
      black: "bg-black"
    }
  ]
  const colorBlock = useCallback((x: Color) => {
    switch (x) {
      case Color.Black:
        return <label htmlFor={x} className={`bg-black w-10 h-10 rounded-full hover:cursor-pointer border border-zinc-200 ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.White:
        return <label htmlFor={x} className={`bg-white w-10 h-10 rounded-full hover:cursor-pointer border border-zinc-200 ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.Brown:
        return <label htmlFor={x} className={`bg-yellow-800 w-10 h-10 rounded-full hover:cursor-pointer border border-zinc-200 ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.Red:
        return <label htmlFor={x} className={`bg-red-900 w-10 h-10 rounded-full hover:cursor-pointer border border-zinc-200 ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.Gold:
        return <label htmlFor={x} className={`bg-amber-200 w-10 h-10 rounded-full hover:cursor-pointer border border-zinc-200 ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.Gray:
        return <label htmlFor={x} className={`bg-gray-500 w-10 h-10 rounded-full hover:cursor-pointer border border-zinc-200 ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.Cream:
        return <label htmlFor={x} className={`bg-amber-50 w-10 h-10 rounded-full hover:cursor-pointer border border-zinc-200 ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.Yellow:
        return <label htmlFor={x} className={`bg-yellow-200 w-10 h-10 rounded-full hover:cursor-pointer border border-zinc-200 ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.BlackAndWhite:
        return <label htmlFor={x} className={`bg-white ring-8 ring-black ring-inset w-10 h-10 rounded-full hover:cursor-pointer  ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>
      case Color.BrownAndWhite:
        return <label htmlFor={x} className={`bg-white ring-8 ring-yellow-800 ring-inset w-10 h-10 rounded-full hover:cursor-pointer ${x != color && color != undefined ? "opacity-20 hover:opacity-100" : ""}`}></label>

    }

    // if (color === Color.Black) {
    //   return <label htmlFor={color} className="w-10 h-10 rounded-full bg-black"></label>
    // }
  }, [color])

  return (
    <>
      <div>
        <Heading type={"h2"} text={"Gender"} className="mb-2" />
        {Object.values(Gender).map((x) => (
          <div className="flex gap-2 items-center mb-2">
            <input
              id={x}
              name={x}
              type="radio"
              className="h-4 w-4 rounded-full border-zinc-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
              onChange={() => setGender && setGender(x)}
              checked={x === gender}
            />
            <label htmlFor={x} className="block text-sm leading-6 text-zinc-900 cursor-pointer">
              {x}
            </label>
          </div>
        ))}
      </div>
      <div>
        <Heading type={"h2"} text={"Size"} className="mb-2 mt-5" />
        {Object.values(Size).map((x) => (
          <div className="flex gap-2 items-center mb-2">
            <input
              id={x}
              name={x}
              type="radio"
              className="h-4 w-4 rounded-full border-zinc-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
              onChange={() => setSize && setSize(x)}
              checked={x === size}
            />
            <label htmlFor={x} className="block text-sm leading-6 text-zinc-900 cursor-pointer">
              {x}
            </label>
          </div>
        ))}
      </div>
      <div>
        <Heading type={"h2"} text={"Coat Length"} className="mb-2 mt-5" />
        {Object.values(CoatLength).map((x) => (
          <div className="flex gap-2 items-center mb-2">
            <input
              id={x + "_length"}
              name={x + "_length"}
              type="radio"
              className="h-4 w-4 rounded-full border-zinc-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
              onChange={() => setCoatLength && setCoatLength(x)}
              checked={x + "_length" === coatLength + "_length"}
            />
            <label htmlFor={x + "_length"} className="block text-sm leading-6 text-zinc-900 cursor-pointer">
              {x}
            </label>
          </div>
        ))}
      </div>
      <div>
        <Heading type={"h2"} text={"Colors"} className="mb-2 mt-5" />
        <div className="grid grid-cols-4 gap-3">
          {Object.values(Color).map((x) => (
            <div className="flex">
              <input
                id={x}
                name={x}
                type="radio"
                className="h-4 w-4 rounded-full border-zinc-300 text-teal-600 focus:ring-teal-600 cursor-pointer peer hidden"
                onChange={() => setColor && setColor(x)}
                checked={x === color}
              />
              {colorBlock(x)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Filter;

