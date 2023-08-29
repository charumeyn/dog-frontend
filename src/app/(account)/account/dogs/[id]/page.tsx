
import AccountContainer from "@/app/components/layout/AccountContainer";
import EditDogContent from "@/app/feature/account/EditDogContent";

export default function RegisterDog({ params }: { params: any }) {

  return (
    <AccountContainer
      currentPage={'dogs'}
      mainContent={
        <EditDogContent id={Number(params.id)} />
      } />
  )
}
