import Container, { ContainerType } from "@/app/components/layout/Container";
import RegisterShelterDetailsContent from "@/app/feature/account/RegisterShelterDetailsContent";

export default function RegisterShelterThankYou() {

  return (
    <Container
      type={ContainerType.NarrowColumn}
      className="pt-20"
      mainContent={
        <div>Successfully registered shelter! Login now</div>
      } />
  )
}

