import { IconClose } from "@/app/components/layout/Icons";
import { useAccountById } from "@/app/hooks/api/useAuth";

type SelectedUserProps = {
  userId: number;
  setUserId: (userId: number | undefined) => void;
}

const SelectedShelter: React.FunctionComponent<SelectedUserProps> = ({ userId, setUserId }) => {

  const { data: account } = useAccountById(userId)

  return (
    <div>
      <h3 className="text-zinc-700 mb-2 mt-6">Selected household:</h3>
      <div className="flex bg-teal-600 rounded-lg px-4 py-3 items-center gap-x-4 w-80">
        {/* <img src={shelter?.mainImage} className="w-14 h-14 rounded-full aspect-[5/5] object-cover" /> */}
        <div>
          <p className="font-bold text-lg text-white">{account?.firstName} {account?.lastName}</p>
        </div>
        <div className="flex ml-auto hover:cursor-pointer" onClick={() => setUserId(undefined)}><IconClose className="w-5 h-5 text-white" /></div>
      </div>
    </div>
  )
}

export default SelectedShelter;