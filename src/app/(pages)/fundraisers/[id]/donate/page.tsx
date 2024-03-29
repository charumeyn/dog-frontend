import Container, { ContainerType } from "@/app/components/layout/Container"
import DonateFundraiserContent from "@/app/feature/fundraisers/DonateFundraiserContent"


export default function DonateFundraiser({ params, searchParams }: { params: any, searchParams: any }) {
  return (
    <Container
      type={ContainerType.NarrowColumn}
      className="py-16 bg-zinc-100"
      mainContent={
        <DonateFundraiserContent fundraiserId={params.id} recipientId={searchParams.recipientId} />
      }
    />
  )
}