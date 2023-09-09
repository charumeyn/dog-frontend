import Container, { ContainerType } from "@/app/components/layout/Container";
import { ThankYouContentDog, ThankYouContentFundraiser } from "@/app/feature/payment-complete/ThankYouContentDog";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";

interface DonationParams {
  donationType: DonationType;
  recipientType: RecipientType;
  recipientId: number;
  id: number;
}

export default function ThankYou({ searchParams }: { searchParams: DonationParams }) {

  return (
    <Container
      type={ContainerType.SingleColumn}
      className="py-16 bg-zinc-100"
      mainContent={
        searchParams.donationType === DonationType.Dog ?
          <ThankYouContentDog searchParams={searchParams} /> :
          <ThankYouContentFundraiser searchParams={searchParams} />
      }
    />
  )
}