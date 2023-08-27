import { queryKeys } from "@/app/queryKey/queryKeys";
import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { Dog } from "@/app/types/dog.interface";
import { CreateShelterDto, Shelter } from "@/app/types/shelter.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const createShelter = async (dto: CreateShelterDto) => {
  const res = await fetch(`http://localhost:3000/shelters/`, {
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

const useCreateShelter = (
  onCreateSuccess: (data: SuccessResult<Shelter>) => void,
  onCreateError?: (error: FailResult) => void
) => {
  return useMutation((dto: CreateShelterDto) => createShelter(dto), {
    onSuccess: (data: SuccessResult<Shelter> | FailResult) => {
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

export { useShelters, useShelter, useCreateShelter }