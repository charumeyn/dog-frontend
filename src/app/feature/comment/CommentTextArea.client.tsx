import Button from "@/app/components/layout/common/Button";
import { DonationType } from "@/app/types/enum/donationType.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { useCallback, useState } from "react";

type CommentTextAreaProps = {
  donationType: DonationType;
  recipientType: RecipientType;
}

const CommentTextArea: React.FunctionComponent<CommentTextAreaProps> = ({ donationType, recipientType }) => {

  const [comment, setComment] = useState<string>("");

  // const { mutate: comment } = useComment(onCommentSuccess, onCommentSuccess)

  const submit = useCallback((e: any) => {
    // e.preventDefault();

    // comment({ comment })
  }, [comment])


  return (
    <form>
      <textarea placeholder="name" required
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" text="Post" onClick={submit} />
    </form>
  )
}

export default CommentTextArea;