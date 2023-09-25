"use client"

export function DogCardSkeleton() {
  return (
    <section className="animate-pulse">
      <div className="bg-zinc-200 pt-[100%] mb-3"></div>
      <div className="bg-zinc-200 h-6 mb-2"></div>
      <div className="bg-zinc-200 h-6 w-2/3"></div>
    </section>
  )
}

export function FundraiserCardSkeleton() {
  return (
    <section className="animate-pulse">
      <div className="bg-zinc-200 pt-[100%] mb-3"></div>
      <div className="bg-zinc-200 h-6 mb-2 w-1/3"></div>
      <div className="bg-zinc-200 h-6 mb-2"></div>
      <div className="bg-zinc-200 h-6 mb-2 w-2/3"></div>
      <div className="bg-zinc-200 h-6 mb-2"></div>
      <div className="bg-zinc-200 h-6 mb-2 w-1/2"></div>
    </section>
  )
}

export function PostCardSkeleton() {
  return (
    <section className="animate-pulse">
      <div className="bg-zinc-200 pt-[100%]"></div>
    </section>
  )
}

