"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import { useFundraisers } from "@/app/hooks/api/useFundraisers"
import { useMemo, useState } from "react";
import SelectedFilters from "../fundraisers/SelectedFilters";
import FundraiserCard from "./FundraiserCard";
import Pagination from "@/app/components/layout/common/Pagination";
import { FundraiserStatus } from "@/app/types/enum/fundraiserStatus.enum";
import { FundraiserCardSkeleton } from "@/app/components/layout/common/CardSkeleton";

export default function FundraiserListContent() {
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [status, setStatus] = useState<FundraiserStatus | undefined>(FundraiserStatus.InProgress)

  const { data: fundraisers, isLoading } = useFundraisers(limit, offset, status)

  return (
    <>
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          <SelectedFilters
            limit={limit}
            setLimit={setLimit}
            status={status}
            setStatus={setStatus}
          />
        }
      />
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          fundraisers ?
            <>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-5">
                  {isLoading ?
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) =>
                      <FundraiserCardSkeleton key={x} />
                    ) :
                    fundraisers.map((fundraiser, i) => (
                      <FundraiserCard key={i} fundraiser={fundraiser} />
                    ))}
                </div>
              </div>
              {fundraisers.length <= 0 ?
                <div className="bg-zinc-100 py-14 text-center rounded-lg">No fundraisers found.</div> : null}
            </>
            : null
        }
      />
      <Container
        type={ContainerType.SingleColumn}
        mainContent={
          fundraisers ?
            <Pagination offset={offset} setOffset={setOffset} limit={limit} currentLength={fundraisers?.length} />
            : null
        }
      />
    </>
  )
}