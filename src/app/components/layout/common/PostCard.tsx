import { Post } from "@/app/types/post.interface";
import PostModal from "./PostPopup";
import { useMemo, useState } from "react";
import ImageGallery from "./ImageGallery";
import AddToFavorites from "@/app/feature/dogs/AddToFavorites";
import { Dog } from "@/app/types/dog.interface";
import { User } from "@/app/types/user.interface";

type PostCard = {
  post: Post;
  dog: Dog;
  account: User;
}

const PostCard: React.FunctionComponent<PostCard> = ({ post, dog, account }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const existingId = useMemo(() => {
    if (account.id && account.favoriteDogIds.length > 0) {
      return account.favoriteDogIds.some(id => Number(id) === Number(dog.id))
    }
  }, [account]);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <div className="relative after:content-[''] after:block after:pb-[100%]">
          <img className="absolute w-full h-full object-cover"
            src={post.mainImage}
            alt={post.title} />
        </div >
      </div>
      <PostModal
        isOpen={isOpen} setIsOpen={setIsOpen}
        children={
          <div className="grid grid-cols-2 gap-x-8">
            <ImageGallery images={post.images} mainImage={post.mainImage} isSquare />
            <div>
              <div className="flex gap-x-5 items-center border-b border-zinc-200 pb-2">
                <div className="flex items-center gap-x-3">
                  <img src={post.mainImage} className="w-10 h-10 rounded-full" />
                  <span className="text-sm font-medium">
                    {dog.name}
                  </span>
                </div>
                {existingId ?
                  null : <AddToFavorites account={account} dogId={dog.id} />
                }
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}

export default PostCard;