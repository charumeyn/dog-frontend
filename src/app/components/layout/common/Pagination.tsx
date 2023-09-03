import { IconChevronLeft, IconChevronRight } from "../Icons";

export default function Pagination({ offset, setOffset, limit, currentLength }: { offset: number, setOffset: (offset: number) => void, limit: number, currentLength: number }) {
  return (
    <div className="flex justify-center gap-5 border-t border-zinc-200 py-8">
      <a onClick={() => setOffset(offset - limit)}
        className={`${offset === 1 ? "pointer-events-none	opacity-50" : ""} flex items-center gap-x-2 border border-zinc-200 rounded-full px-4 py-2 text-sm hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:cursor-pointer`}>
        <IconChevronLeft className="w-4 h-4" />Previous
      </a>
      <a onClick={() => setOffset(offset + limit)}
        className={`${currentLength === 0 ? "pointer-events-none	opacity-50" : ""} flex items-center gap-x-2 border border-zinc-200 rounded-full px-4 py-2 text-sm hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:cursor-pointer`}>
        Next<IconChevronRight className="w-4 h-4" />
      </a>
    </div>
  )
}