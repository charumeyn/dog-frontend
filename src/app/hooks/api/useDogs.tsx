import { queryKeys } from "@/app/queryKey/queryKeys";
import { Dog } from "@/app/types/dog.interface";
import { useQuery } from "@tanstack/react-query";

const getDogs = async (limit?: number) => {
  const limitParam = limit ? `?limit=${limit}` : '';
  const res = await fetch(`http://localhost:3000/dogs/${limitParam}`);

  return res.json();
};

const useDogs = (limit?: number) => {
  return useQuery<Dog[]>(
    queryKeys.dogs(limit),
    () => getDogs(limit),
  );
};

const getDog = async (id: number) => {
  const res = await fetch(`http://localhost:3000/dogs/${id}`);
  return res.json();
};

const useDog = (id: number) => {
  return useQuery<Dog>(
    queryKeys.dog(id),
    () => getDog(id),
  );
};

export { useDogs, useDog }