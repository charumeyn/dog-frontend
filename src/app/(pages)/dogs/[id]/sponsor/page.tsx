import Container, { ContainerType } from "@/app/components/layout/Container"
import SponsorDogContent from "@/app/feature/dogs/SponsorDogContent"


export default function SponsorDog({ params }: { params: any }) {
  return (
    <Container
      type={ContainerType.NarrowColumn}
      className="py-16 bg-zinc-100"
      mainContent={
        <SponsorDogContent dogId={params.id} />
      }
    />
  )
}