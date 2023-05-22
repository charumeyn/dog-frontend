import { queryKeys } from "@/app/queryKey/queryKeys";
import { Dog } from "@/app/types/dog.interface";
import { useQuery } from "@tanstack/react-query";

const getDogs = async () => {
  const res = await fetch(`http://localhost:3000/dogs/`);
  return res.json();
};

const useDogs = () => {
  return useQuery<Dog[]>(
    queryKeys.dogs,
    () => getDogs(),
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