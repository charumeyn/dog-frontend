import { queryKeys } from "@/app/queryKey/queryKeys";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import { useQuery } from "@tanstack/react-query";

const getFunraisers = async () => {
  const res = await fetch(`http://localhost:3000/fundraisers`);

  return res.json();
};

const useFundraisers = () => {
  return useQuery<Fundraiser[]>(
    queryKeys.posts(),
    () => getFunraisers(),
  );
};

export { useFundraisers }