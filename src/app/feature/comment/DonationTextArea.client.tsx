import { IconCheck } from "@/app/components/layout/Icons";
import Button from "@/app/components/layout/common/Button";
import ButtonLink from "@/app/components/layout/common/ButtonLink";
import { useCreateComment } from "@/app/hooks/api/useComment";
import { Account } from "@/app/types/account.interface";
import { CommentType } from "@/app/types/enum/commentType.enum";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { User } from "@/app/types/user.interface";
import { useCallback, useMemo, useState } from "react";

type DonationTextAreaProps = {
  donationType: DonationType;
  recipientType: RecipientType;
  recipientId: number;
  account?: User;
}

const DonationTextArea: React.FunctionComponent<DonationTextAreaProps> = ({ donationType, recipientType, recipientId, account }) => {

  const [comment, setComment] = useState<string>("");

  const { mutate: postComment, isSuccess } = useCreateComment()

  const submit = useCallback((e: any) => {
    e.preventDefault();

    if (account && comment) {
      const body = {
        userId: account?.id,
        commentType: donationType === DonationType.Dog ? CommentType.Dog : CommentType.Fundraiser,
        dogId: donationType === DonationType.Dog ? recipientId : undefined,
        fundraiserId: donationType === DonationType.Fundraiser ? recipientId : undefined,
        content: comment
      }

      postComment(body)
    }
  }, [comment])

  const url = useMemo(() => {
    if (donationType === DonationType.Dog) {
      return `/dogs/${recipientId}`
    } else {
      return `/fundraisers/${recipientId}`
    }
  }, [donationType, recipientId])

  return (
    <form>
      <textarea
        placeholder="Let's leave encouraging words :)"
        required
        onChange={(e) => setComment(e.target.value)}
        className={`${isSuccess ? "bg-zinc-100 text-zinc-500" : ""} border border-zinc-200 rounded-lg w-full mb-4`}
        rows={6}
        disabled={isSuccess}
      />
      <div className="flex justify-between items-center">
        <Button
          type="submit"
          content={
            isSuccess ?
              <div className="flex gap-x-2 items-center">
                <IconCheck />
                Posted!
              </div> :
              "Post"
          }
          onClick={submit}
          color="orange"
          disabled={isSuccess} />
        <a href={url} className="text-zinc-400">Go back to page</a>
      </div>
    </form>
  )
}

export default DonationTextArea;