import { ReactNode } from "react";

type CapsuleProps = {
  color: string;
  children: ReactNode;
}

export function Capsule(props: CapsuleProps) {
  return (
    <div className={`
      ${props.color === "orange" ? "bg-orange-100 text-orange-600" : ""} 
      ${props.color === "grey" ? "bg-zinc-100 text-zinc-600" : ""} 
      ${props.color === "teal" ? "bg-teal-100 text-teal-600" : ""} 
      ${props.color === "blue" ? "bg-blue-100 text-blue-600" : ""} 
      rounded-full px-3 py-1 font-medium text-xs uppercase text-center inline-flex`}
    >
      {props.children}
    </div>
  )
}