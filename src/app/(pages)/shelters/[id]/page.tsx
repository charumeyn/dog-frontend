import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import { ShelterContent } from "@/app/feature/shelters/ShelterContent";


export default function Shelter({ params }: { params: any }) {

  return (

    <Container
      type={ContainerType.SingleColumn}
      className="pt-14 pb-14"
      mainContent={
        <ShelterContent id={Number(params.id)} />
      }
    />
  )
}