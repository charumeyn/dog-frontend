import { RecipientType } from "@/app/types/enum/recipientType.enum";
import SelectedDog from "./SelectedDog";
import { useAccounts } from "@/app/hooks/api/useAuth";
import { useMemo } from "react";
import { User, UserType } from "@/app/types/user.interface";
import { useShelter, useShelters } from "@/app/hooks/api/useShelters";
import SelectedShelter from "./SelectedShelter";
import SelectedUser from "./SelectedUser";

type CreatePurposeProps = {
  type: string;
  setType: (type: RecipientType) => void;
  dogId: number | undefined;
  setDogId: (dogId: number | undefined) => void;
  shelterId: number | undefined;
  setShelterId: (shelterId: number | undefined) => void;
  userId: number | undefined;
  setUserId: (userId: number | undefined) => void;
  account: User;
}
const CreatePurpose: React.FunctionComponent<CreatePurposeProps> = ({ type, setType, dogId, setDogId, shelterId, setShelterId, userId, setUserId, account }) => {

  const { data: shelters } = useShelters(100)
  const { data: accounts } = useAccounts()

  const dogs = useMemo(() => {
    if (account?.type === UserType.Shelter) {
      const { data: shelter } = useShelter(Number(account?.shelter.id))
      if (shelter) {
        return shelter.dogs
      }
    } else {
      return account?.dogs
    }
  }, [account])


  return (
    <div className="px-6 py-6">
      <h3 className="text-zinc-700 mb-2">Who are you fundraising for?</h3>
      <div className="grid grid-cols-3 gap-x-2">
        {Object.entries(RecipientType).map((text, i) =>
          <label htmlFor={text[1]} key={i}
            className={`${type == text[1] ? "border-teal-600 text-teal-600" : "hover:border-zinc-400 hover:text-zinc-700"} 
              font-medium rounded-lg text-center border-2 hover:cursor-pointer py-5 `}>
            <input
              id={text[1]}
              type="radio"
              name={text[1]}
              value={text[1]}
              onChange={() => setType(text[1])}
              checked={type == text[1]}
              className="hidden peer"
            />
            {text[0] === "User" ? "Household" : text[0]}
          </label>
        )}
      </div>

      {type === RecipientType.Dog && dogId === undefined ?
        dogs && dogs?.length > 0 ?
          <div>
            <h3 className="text-zinc-700 mb-2 mt-6">Select a dog</h3>
            <select
              id="dogId"
              name="dogId"
              value={dogId}
              onChange={(e: any) => setDogId(e.target.value)}
              className="block w-full text-sm border border-zinc-300 rounded-md px-4 py-3"
            >
              {dogs?.map((dog) => (
                <option key={dog.id} value={dog.id}>
                  {dog.name}
                </option>
              ))}
            </select>
          </div>
          : <div className="mt-5 text-zinc-500 text-sm">No dog registered on your account. Please <a className="text-teal-600" href="/dogs/register">register a dog</a> first</div>
        : null
      }

      {type === RecipientType.Dog && dogId !== undefined ?
        <SelectedDog dogId={dogId} setDogId={setDogId} />
        : null
      }

      {type === RecipientType.Shelter && shelterId === undefined ?
        <div>
          <h3 className="text-zinc-700 mb-2 mt-6">Select a shelter</h3>
          <select
            id="shelterId"
            name="shelterId"
            value={shelterId}
            onChange={(e: any) => setShelterId(e.target.value)}
            className="block w-full text-sm border border-zinc-300 rounded-md px-4 py-3"
          >
            {shelters?.map((shelter) => (
              <option key={shelter.id} value={shelter.id}>
                {shelter.name}
              </option>
            ))}
          </select>
        </div>
        : null
      }

      {type === RecipientType.Shelter && shelterId !== undefined ?
        <SelectedShelter shelterId={shelterId} setShelterId={setShelterId} />
        : null
      }

      {type === RecipientType.User && userId === undefined ?
        <div>
          <h3 className="text-zinc-700 mb-2 mt-6">Select a user</h3>
          <select
            id="userId"
            name="userId"
            value={userId}
            onChange={(e: any) => setUserId(e.target.value)}
            className="block w-full text-sm border border-zinc-300 rounded-md px-4 py-3"
          >
            {accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.firstName} {account.lastName}
              </option>
            ))}
          </select>
        </div>
        : null
      }

      {type === RecipientType.User && userId !== undefined ?
        <SelectedUser userId={userId} setUserId={setUserId} />
        : null
      }
    </div>
  )
}

export default CreatePurpose;