"use client"

import DogCard from "@/app/components/layout/common/DogCard";
import { useShelter } from "@/app/hooks/api/useShelters";
import { Dog } from "@/app/types/dog.interface";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useEffect, useMemo, useState } from "react";
import { IconPin } from "@/app/components/layout/Icons";
import { Shelter } from "@/app/types/shelter.interface";
import Share from "@/app/components/layout/common/Share";

export function ShelterContent({ id }: { id: number }) {

  const { data: shelter, isLoading: isLoadingShelter } = useShelter(id);

  const { isLoaded } = useLoadScript({
    //@ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  })

  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <main>

      <div className="grid lg:grid-cols-2 gap-10">

        <div>
          <div className="flex items-start lg:items-center gap-x-3 lg:gap-x-6 mb-5">
            <img src={shelter?.mainImage} className="w-10 lg:w-20 h-10 lg:h-20 rounded-full" />
            <div>
              <h3 className="font-semibold lg:text-lg">{shelter?.name}</h3>
              <p className="text-sm mb-2">{shelter?.fundraisers?.length} fundraisers <span className="text-zinc-200 px-2">•</span> {shelter?.dogs?.length} dogs</p>
              <p className="text-sm text-zinc-500 ">{shelter?.user?.email} <span className="text-zinc-200 px-2">•</span> {shelter?.user?.phone}</p>
            </div>

          </div>
          <div className="border border-zinc-100 px-6 py-6 rounded-xl text-sm leading-relaxed">
            {shelter?.content}
          </div>
        </div>

        <div>
          <div className="flex lg:items-center gap-x-2 mb-2 text-sm">
            <IconPin className="w-4 h-4" />{shelter?.address}
          </div>
          {isLoaded ? shelter?.address && <Map address={shelter?.address} />
            :
            <div className="animate-pulse rounded-lg">
              <div className="block h-80 w-full bg-zinc-200">
              </div>
            </div>
          }
          {shelter ?
            <div className="mt-4">
              <Share isOpen={isOpen} setIsOpen={setIsOpen} type={"shelter"} id={shelter?.id} name={shelter?.name} isButton={true} />
            </div> :
            null}
        </div>
      </div>

      <h2 className="mb-5 font-semibold text-lg lg:text-2xl text-center mt-10 lg:mt-20">Dogs from {shelter?.name}</h2>
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {shelter?.dogs && shelter?.dogs.map((dog: Dog, i: number) =>
            <DogCard key={i} dog={dog} />
          )}
        </div>
      </div>

    </main>
  )
}

function Map({ address }: { address: string }) {

  const [selected, setSelected] = useState<any>(null);

  const {
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const getPinnedAddress = async () => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  useEffect(() => {
    getPinnedAddress()
  }, [])

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={selected}
        mapContainerClassName="w-full h-80 rounded-xl"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  )
}

const PlacesAutocomplete = ({ setSelected }: { setSelected: (selected: any) => void }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };


  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="text-zinc-900 focus:ring-teal-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm sm:leading-6 mb-2 mt-2"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};