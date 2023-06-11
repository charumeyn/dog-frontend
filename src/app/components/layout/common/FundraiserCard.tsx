import { Fundraiser } from "@/app/types/fundraiser.interface";

type FundraiserCard = {
  fundraiser: Fundraiser;
}

const PostCard: React.FunctionComponent<FundraiserCard> = ({ fundraiser }) => {
  return (
    <a href={`/fundraiser/${fundraiser.id}`}>
      <div className="relative after:content-[''] after:block after:pb-[100%]">
        <img className="absolute w-full h-full object-cover rounded-lg"
          src={fundraiser.images.length > 0 ? fundraiser.images[0] : "https://images.pexels.com/photos/3104709/pexels-photo-3104709.jpeg"}
          alt={fundraiser.title} />
      </div >
      <p className="flex justify-between font-bold text-xl mt-5 mb-2">{fundraiser.title}</p>
      <p className="text-gray-600 mb-2">{fundraiser.content}</p>

    </a>
  )
}


export default PostCard;