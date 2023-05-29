"use client"

import { useDog } from "@/app/hooks/api/useDogs";

type Doggos = {
  params: any;
}

export default function Doggos({ params }: { params: any }) {

  const id = Number(params.id);

  const { data: dog, isLoading, isFetching, error } = useDog(id);

  return (
    <div>
      {dog && <>Am a dog {JSON.stringify(dog.name)}</>}
      <br />
      {dog?.color.map((color: Color, i: number) =>
        <div>{color}</div>
      )}
      {dog?.color.map((color: Color, i: number) => {
        return color
      }
      )}
    </div>
  )
}