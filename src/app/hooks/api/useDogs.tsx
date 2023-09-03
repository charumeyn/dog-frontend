import { queryKeys } from "@/app/queryKey/queryKeys";
import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { CreateDogDto, Dog, UpdateDogDto } from "@/app/types/dog.interface";
import { Gender } from "@/app/types/enum/gender.enum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Color } from "aws-sdk/clients/lookoutvision";

const getDogs = async (limit: number, offset?: number, gender?: string, size?: string, color?: string, coatLength?: string) => {
  const genderParam = gender ? `&gender=${gender}` : '';
  const sizeParam = size ? `&size=${size}` : '';
  const colorParam = color ? `&color=${color}` : '';
  const coatLengthParam = coatLength ? `&coatLength=${coatLength}` : '';
  const offsetParam = offset ? `&offset=${offset}` : '';

  const res = await fetch(`http://localhost:3000/dogs/?limit=${limit}${offsetParam}${genderParam}${sizeParam}${colorParam}${coatLengthParam}`);

  return res.json();
};

const useDogs = (limit: number, offset?: number, gender?: string, size?: string, color?: string, coatLength?: string) => {
  return useQuery<Dog[]>(
    queryKeys.dogs(limit, offset, gender, size, color, coatLength),
    () => getDogs(limit, offset, gender, size, color, coatLength),
  );
};

export interface PaginationDto {
  limit: number;
  color?: Color;
  gender?: Gender;
}

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

const createDog = async (dto: CreateDogDto) => {
  const res = await fetch(`http://localhost:3000/dogs/`, {
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

const useCreateDog = (
  onCreateSuccess: (data: SuccessResult<Dog>) => void,
  onCreateError?: (error: FailResult) => void
) => {
  return useMutation((dto: CreateDogDto) => createDog(dto), {
    onSuccess: (data: SuccessResult<Dog> | FailResult) => {
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

const updateDog = async (dto: UpdateDogDto) => {

  const { id, ...bodyWithoutId } = dto;

  const res = await fetch(`http://localhost:3000/dogs/${dto.id}`, {
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

const useUpdateDog = (
  onCreateSuccess: () => void,
  onCreateError?: (error: FailResult) => void
) => {
  return useMutation((dto: UpdateDogDto) => updateDog(dto), {
    onSuccess: (data: SuccessResult<Dog> | FailResult) => {
      if (!data.success) {
        if (onCreateError) onCreateError(data)
      } else {
        onCreateSuccess()
      }
    },
    onError: (error: FailResult) => {
      if (onCreateError) {
        onCreateError(error);
      }
    },
  });
};

export { useDogs, useDog, useCreateDog, useUpdateDog }