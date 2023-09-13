import { IconClose } from "@/app/components/layout/Icons";
import { useShelter } from "@/app/hooks/api/useShelters";

type SelectedShelterProps = {
  shelterId: number;
  setShelterId: (shelterId: number | undefined) => void;
}

const SelectedShelter: React.FunctionComponent<SelectedShelterProps> = ({ shelterId, setShelterId }) => {

  const { data: shelter } = useShelter(shelterId);

  return (
    <div>
      <h3 className="text-zinc-700 mb-2 mt-6">Selected shelter:</h3>
      <div className="flex bg-teal-600 rounded-lg px-4 py-3 items-center gap-x-4 w-80">
        <img src={shelter?.mainImage} className="w-14 h-14 rounded-full aspect-[5/5] object-cover" />
        <div>
          <p className="font-bold md:text-lg text-white">{shelter?.name}</p>
        </div>
        <div className="flex ml-auto hover:cursor-pointer" onClick={() => setShelterId(undefined)}><IconClose className="w-5 h-5 text-white" /></div>
      </div>
    </div>
  )
}

export default SelectedShelter;