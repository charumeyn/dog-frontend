import { Dog } from "@/app/types/dog.interface";

type DogCard = {
  dog: Dog;
}


const DogCard: React.FunctionComponent<DogCard> = ({ dog }) => {
  return (
    <a href={`/dogs/${dog.id}`}>
      <div className="relative after:content-[''] after:block after:pb-[100%]">
        <img className="absolute w-full h-full object-cover rounded-lg"
          src={dog.images.length > 0 ? dog.images[0] : "https://images.pexels.com/photos/3104709/pexels-photo-3104709.jpeg"}
          alt={dog.name} />
      </div >
      <p className="font-bold text-xl mt-5 mb-2">{dog.name}</p>
      <p className="text-gray-600 mb-2">{dog.description}</p>
    </a>
  )
}


export default DogCard;