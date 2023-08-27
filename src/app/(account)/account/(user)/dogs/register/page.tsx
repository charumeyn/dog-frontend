
import AccountContainer from "@/app/components/layout/AccountContainer";
import DogsContent from "@/app/feature/account/DogsContent";
import RegisterDogContent from "@/app/feature/account/RegisterDogContent";

export default function RegisterDog({ params }: { params: any }) {

  return (
    <AccountContainer
      currentPage={'dogs'}
      mainContent={
        <RegisterDogContent />
      } />
  )
}
