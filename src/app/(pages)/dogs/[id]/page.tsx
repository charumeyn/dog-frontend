import DogDetailContent from "@/app/feature/dogs/DogDetailContent";

export default function Dog({ params }: { params: any }) {

  return (
    <DogDetailContent id={Number(params.id)} />
  )
}