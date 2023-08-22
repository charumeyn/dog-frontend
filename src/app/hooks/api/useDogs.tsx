import { queryKeys } from "@/app/queryKey/queryKeys";
import { Dog } from "@/app/types/dog.interface";
import { Gender } from "@/app/types/enum/gender.enum";
import { useQuery } from "@tanstack/react-query";
import { Color } from "aws-sdk/clients/lookoutvision";

const getDogs = async (limit?: number, gender?: number) => {
  const limitParam = limit ? `?limit=${limit}` : '';
  const genderParam = gender ? `&gender=${gender}` : '';

  // const warehouseIdParams = warehouseIds
  //   .map((whId) => `&warehouseIds[]=${whId}`)
  //   .join("");
  // const gradeParam = grades.map((grade) => `&grades[]=${grade}`).join("");


  const res = await fetch(`http://localhost:3000/dogs/${limitParam}${genderParam}`);

  return res.json();
};

// const useDogs = (limit?: number) => {
//   return useQuery<Dog[]>(
//     queryKeys.dogs(limit),
//     () => getDogs(limit),
//   );
// };

export interface PaginationDto {
  limit: number;
  color?: Color;
  gender?: Gender;
}

const useDogs = (dto: PaginationDto) => {
  return useQuery<Dog[]>(
    queryKeys.dogs(dto),
    () => getDogs(dto.limit, dto.gender),
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