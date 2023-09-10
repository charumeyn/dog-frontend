import { IconClose } from "@/app/components/layout/Icons";
import { useDog } from "@/app/hooks/api/useDogs";

type SelectedDogProps = {
  dogId: number;
  setDogId: (dogId: number | undefined) => void;
}

const SelectedDog: React.FunctionComponent<SelectedDogProps> = ({ dogId, setDogId }) => {

  const { data: dog } = useDog(dogId);

  return (
    <div>
      <h3 className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Selected dog:</h3>
      <div className="flex bg-teal-600 rounded-lg px-4 py-3 items-center gap-x-4 w-80">
        <img src={dog?.mainImage} className="w-14 h-14 rounded-full aspect-[5/5] object-cover" />
        <div>
          <p className="font-bold text-lg text-white">{dog?.name}</p>
        </div>
        <div className="flex ml-auto hover:cursor-pointer" onClick={() => setDogId(undefined)}><IconClose className="w-5 h-5 text-white" /></div>
      </div>
    </div>
  )
}

export default SelectedDog;