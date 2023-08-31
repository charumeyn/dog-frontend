import Container, { ContainerType } from "@/app/components/layout/Container";
import LoginContent from "@/app/feature/account/login/LoginContent";

export default function Login() {
  return (
    <Container
      type={ContainerType.NarrowColumn}
      className="pt-20 pb-20"
      withBg
      mainContent={
        <LoginContent />
      } />
  )
}

