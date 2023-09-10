import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import RegisterContent from "@/app/feature/account/RegisterContent";

export default function Register() {

  return (

    <Container
      type={ContainerType.NarrowColumn}
      className="pt-20 pb-20"
      withBg
      mainContent={
        <div>
          <Heading type={"h1"} text={"Register for an account"} className="font-bold mb-8 text-center" />
          <RegisterContent />
        </div>
      } />
  )
}

