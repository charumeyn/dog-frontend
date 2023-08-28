
import AccountContainer from "@/app/components/layout/AccountContainer";
import DogsContent from "@/app/feature/account/DogsContent";
import EditDogContent from "@/app/feature/account/EditDogContent";
import RegisterDogContent from "@/app/feature/account/RegisterDogContent";

export default function RegisterDog({ params }: { params: any }) {

  return (
    <AccountContainer
      currentPage={'dogs'}
      mainContent={
        <EditDogContent id={Number(params.id)} />
      } />
  )
}
