import { useDog, useDogs } from "@/app/hooks/api/useDogs";
import { Dog } from "@/app/types/dog.interface";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { Shelter } from "@/app/types/shelter.interface";
import { User } from "@/app/types/user.interface";
import { useCallback, useEffect, useMemo } from "react";
import { idText } from "typescript";
import CreateFundRaiserType from "./SelectedDog";
import { Country } from "@/app/types/enum/countries.enum"
import SelectedDog from "./SelectedDog";
import { useShelters } from "@/app/hooks/api/useShelters";
import SelectedShelter from "./SelectedShelter";

type CreatePurposeProps = {
  purpose: string;
  setPurpose: (purpose: string) => void;
  type: string;
  setType: (type: RecipientType) => void;
  country: string;
  setCountry: (countru: string) => void;
  dogId: number | undefined;
  setDogId: (dogId: number | undefined) => void;
  shelterId: number | undefined;
  setShelterId: (shelterId: number | undefined) => void;
  userId: number | undefined;
  setUserId: (userId: number | undefined) => void;
}
const CreatePurpose: React.FunctionComponent<CreatePurposeProps> = ({ purpose, setPurpose, type, setType, country, setCountry, dogId, setDogId, shelterId, setShelterId, userId, setUserId }) => {

  const { data: dogs } = useDogs();

  const purposes = ["Emergency", "Monthly Bills", "Memorial", "Medical"]

  return (
    <div className="px-6 py-6">
      <h3 className="text-gray-700 mb-2">Who are you fundraising for?</h3>
      <div className="grid grid-cols-3 gap-x-2">
        {Object.entries(RecipientType).map((text, i) =>
          <label htmlFor={text[1]} key={i}
            className={`${type == text[1] ? "border-teal-600 text-teal-600" : "hover:border-gray-500 hover:text-gray-700"} 
              font-medium rounded-lg text-center border-2 hover:cursor-pointer py-5 border-gray-300 text-gray-500`}>
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
        <div>
          <h3 className="text-gray-700 mb-2 mt-6">Select a dog</h3>
          <select
            id="dogId"
            name="dogId"
            value={dogId}
            onChange={(e: any) => setDogId(e.target.value)}
            className="block w-full text-sm border border-gray-300 rounded-md px-4 py-3"
          >
            {dogs?.map((dog) => (
              <option key={dog.id} value={dog.id}>
                {dog.name}
              </option>
            ))}
          </select>
        </div>
        : null
      }

      {type === RecipientType.Dog && dogId !== undefined ?
        <SelectedDog dogId={dogId} setDogId={setDogId} />
        : null
      }

      {/* {type === RecipientType.Shelter && shelterId === undefined ?
        <div>
          <h3 className="text-gray-700 mb-2 mt-6">Select a shelter</h3>
          <select
            id="shelterId"
            name="shelterId"
            value={shelterId}
            onChange={(e: any) => setShelterId(e.target.value)}
            className="block w-full text-sm border border-gray-300 rounded-md px-4 py-3"
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
      } */}

      <h3 className="text-gray-700 mb-2 mt-6">What describes the purpose of your fundraising intiative?</h3>
      <div className="flex gap-x-2">
        {purposes.map((text, i) =>
          <span key={i} onClick={() => setPurpose(text)}
            className={`${text === purpose ? "border-teal-600 text-teal-600" : "hover:border-gray-500 hover:text-gray-700"} 
              border px-4 py-2 rounded-full hover:cursor-pointer border-gray-300 text-gray-500`}>
            {text}
          </span>
        )}
      </div>

      {/* <h3 className="text-gray-700 mb-2 mt-6">Where are you located?</h3> */}
      {/* <select
        id="country"
        name="country"
        value={country}
        onChange={(e: any) => setCountry(e.target.value)}
        className="block w-full text-sm border border-gray-300 rounded-md px-4 py-3"
      >
        {Object.entries(Country).map((country, index) => (
          <option key={country[0]} value={country[1]}>
            {country[0]}
          </option>
        ))}
      </select> */}
    </div>
  )
}

export default CreatePurpose;