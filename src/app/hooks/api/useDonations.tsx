import { queryKeys } from "@/app/queryKey/queryKeys";
import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { Donation } from "@/app/types/donation.interface";
import { DonationCreateDto } from "@/app/types/dto/payment.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getDonations = async (limit?: number) => {
  const limitParam = limit ? `?limit=${limit}` : null;
  const res = await fetch(`http://localhost:3000/dogs${limitParam}`);

  return res.json();
};

const useDonations = (limit?: number) => {
  return useQuery<Donation[]>(
    queryKeys.donations(limit),
    () => getDonations(limit),
  );
};

const getDonation = async (id: number) => {
  const res = await fetch(`http://localhost:3000/donations/${id}`);
  return res.json();
};

const useDonation = (id: number) => {
  return useQuery<Donation>(
    queryKeys.donation(id),
    () => getDonation(id),
  );
};

const createDonation = async (dto: DonationCreateDto) => {
  const res = await fetch(`http://localhost:3000/donations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dto
    })
  });

  const data = await res.json();
  return data;
}

const useCreateDonation = (
  onCreateSuccess: (data: SuccessResult<Donation>) => void,
  onCreateError?: (error: FailResult) => void
) => {
  return useMutation((dto: DonationCreateDto) => createDonation(dto), {
    onSuccess: (data: SuccessResult<Donation> | FailResult) => {
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

export { useDonations, useDonation, useCreateDonation }