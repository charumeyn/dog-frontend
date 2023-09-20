"user client"

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
import { useEffect, useState } from "react";

export function Map({ address, setAddress, isEditAddress }: { address: string, setAddress: (address: string) => void, isEditAddress: boolean }) {

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
      {isEditAddress ? <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} setAddress={setAddress} />
      </div> : null}


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

export const PlacesAutocomplete = ({ setSelected, setAddress }: { setSelected: (selected: any) => void, setAddress: (address: string) => void }) => {
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
    setAddress(address)
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