"use client"

import Container, { ContainerType } from "@/app/components/layout/Container";
import { useFundraisers } from "@/app/hooks/api/useFundraisers"
import { useMemo, useState } from "react";
import SelectedFilters from "../fundraisers/SelectedFilters";
import FundraiserCard from "./FundraiserCard";
import Pagination from "@/app/components/layout/common/Pagination";
import { FundraiserStatus } from "@/app/types/enum/fundraiserStatus.enum";

export default function FundraiserListContent() {
  const [limit, setLimit] = useState<number>(4);
  const [offset, setOffset] = useState<number>(0);
  const [status, setStatus] = useState<FundraiserStatus | undefined>(FundraiserStatus.InProgress)

  const { data: fundraisers } = useFundraisers(limit, offset, status)

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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
                  {fundraisers.map((fundraiser, i) => (
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