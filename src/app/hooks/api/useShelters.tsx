import { queryKeys } from "@/app/queryKey/queryKeys";
import { Dog } from "@/app/types/dog.interface";
import { Shelter } from "@/app/types/shelter.interface";
import { useQuery } from "@tanstack/react-query";

const getShelters = async (limit?: number) => {
  const limitParam = limit ? `?limit=${limit}` : '';
  const res = await fetch(`http://localhost:3000/shelters${limitParam}`);

  return res.json();
};

const useShelters = (limit?: number) => {
  return useQuery<Shelter[]>(
    queryKeys.shelters(limit),
    () => getShelters(limit),
  );
};

const getShelter = async (id: number) => {
  const res = await fetch(`http://localhost:3000/shelters/${id}`);
  return res.json();
};

const useShelter = (id: number) => {
  return useQuery<Shelter>(
    queryKeys.shelter(id),
    () => getShelter(id),
  );
};

export { useShelters, useShelter }