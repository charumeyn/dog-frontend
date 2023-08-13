import { ReactNode } from "react";

type BadgeProps = {
  color?: "orange" | "blue";
  children?: ReactNode;
}

export function Badge(props: BadgeProps) {
  return (
    <th scope="col" className={`
      ${props.color === "orange" ? "bg-orange-100 text-orange-600" : ""} 
      ${props.color === "blue" ? "bg-blue-100 text-blue-600" : ""} 
      rounded-full px-3 py-1 font-medium text-xs`}
    >
      {props.children}
    </th>
  )
}