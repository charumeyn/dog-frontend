import { queryKeys } from "@/app/queryKey/queryKeys";
import { Fundraiser } from "@/app/types/fundraiser.interface";
import { useQuery } from "@tanstack/react-query";

const getFunraisers = async (limit?: number) => {
  const limitParam = limit ? `?limit=${limit}` : null;
  const res = await fetch(`http://localhost:3000/fundraisers${limitParam}`);

  return res.json();
};

const useFundraisers = (limit?: number) => {
  return useQuery<Fundraiser[]>(
    queryKeys.posts(limit),
    () => getFunraisers(limit),
  );
};

export { useFundraisers }