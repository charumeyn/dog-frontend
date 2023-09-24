import Container, { ContainerType } from "@/app/components/layout/Container";
import Heading from "@/app/components/layout/common/Heading";
import Notice from "@/app/components/layout/common/Notice";
import RegisterContent from "@/app/feature/account/RegisterContent";

export default function Register() {

  return (

    <Container
      type={ContainerType.NarrowColumn}
      className="pt-20 pb-20"
      withBg
      mainContent={
        <div>
          <div className="mb-10">
            <Notice children={"Creating an account for a dog shelter?"} url={"/register-shelter"} urlText={"Register here"} />
          </div>
          <Heading type={"h1"} text={"Register for an account"} className="font-bold mb-4 text-center" />
          <RegisterContent />
        </div>
      } />
  )
}

