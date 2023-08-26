import { queryKeys } from "@/app/queryKey/queryKeys";
import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { CreateFundraiserDto, Fundraiser } from "@/app/types/fundraiser.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const getFundraiser = async (id: number) => {
  const res = await fetch(`http://localhost:3000/fundraisers/${id}`);
  return res.json();
};

const useFundraiser = (id: number) => {
  return useQuery<Fundraiser>(
    queryKeys.fundraiser(id),
    () => getFundraiser(id),
  );
};

const createFundraiser = async (dto: CreateFundraiserDto) => {
  const res = await fetch(`http://localhost:3000/fundraisers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...dto
    })
  });

  const data = await res.json();
  return data;
}

const useCreateFundraiser = (
  onCreateSuccess: (data: SuccessResult<Fundraiser>) => void,
  onCreateError?: (error: FailResult) => void
) => {
  return useMutation((dto: CreateFundraiserDto) => createFundraiser(dto), {
    onSuccess: (data: SuccessResult<Fundraiser> | FailResult) => {
      if (!data.success) {
        if (onCreateError) onCreateError(data)
      } else {
        onCreateSuccess(data)
      }
    },
    onError: (error: FailResult) => {
      if (onCreateError) {
        onCreateError(error);
      }
    },
  });
};

export { useFundraisers, useFundraiser, useCreateFundraiser }