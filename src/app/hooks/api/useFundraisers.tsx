import { queryKeys } from "@/app/queryKey/queryKeys";
import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { FundraiserStatus } from "@/app/types/enum/fundraiserStatus.enum";
import { CreateFundraiserDto, Fundraiser, UpdateFundraiserDto } from "@/app/types/fundraiser.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

const getFundraisers = async (limit: number, offset?: number, status?: FundraiserStatus) => {
  const offsetParam = offset ? `&offset=${offset}` : '';
  const statusParam = status ? `&status=${status}` : '';
  const res = await fetch(`http://localhost:3000/fundraisers?limit=${limit}${offsetParam}${statusParam}`);

  return res.json();
};

const useFundraisers = (limit: number, offset?: number, status?: FundraiserStatus) => {
  return useQuery<Fundraiser[]>(
    queryKeys.fundraisers(limit, offset, status),
    () => getFundraisers(limit, offset, status),
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


const updateFundraiser = async (dto: UpdateFundraiserDto) => {

  const { id, ...bodyWithoutId } = dto;

  const res = await fetch(`http://localhost:3000/fundraisers/${dto.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...bodyWithoutId
    })
  });

  const data = await res.json();
  return data;
}

const useUpdateFundraiser = (
  onUpdateSuccess: () => void,
  onUpdateError?: (error: FailResult) => void
) => {
  return useMutation((dto: UpdateFundraiserDto) => updateFundraiser(dto), {
    onSuccess: (data: SuccessResult<Fundraiser> | FailResult) => {
      if (!data.success) {
        if (onUpdateError) onUpdateError(data)
      } else {
        onUpdateSuccess()
      }
    },
    onError: (error: FailResult) => {
      if (onUpdateError) {
        onUpdateError(error);
      }
    },
  });
};

export { useFundraisers, useFundraiser, useCreateFundraiser, useUpdateFundraiser }