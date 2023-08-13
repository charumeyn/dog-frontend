import { ReactNode } from "react";

type TableProps = {
  classNames?: string;
  text?: string;
  isHeader?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  children?: ReactNode;
}

export function TableCell(props: TableProps) {
  return (
    <th scope="col" className={`
      ${props.isFirst ? "pr-3 sm:pl-6" : ""} 
      ${props.isLast ? "pl-3 sm:pr-6 text-right" : ""} 
      ${props.isHeader ? "text-zinc-500" : "text-zinc-900"} 
      py-3.5 pl-4 pr-3 text-left text-sm font-medium `}
    >
      {props.children}
    </th>
  )
}