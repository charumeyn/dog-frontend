"use client"

import { useDogs } from "@/app/hooks/api/useDogs";
import SelectedFilters from "./SelectedFilters";
import Container, { ContainerType } from "@/app/components/layout/Container";
import Filter from "./Filter";
import { useState } from "react";

type DogListContentProps = {

}

const DogListContent: React.FunctionComponent<DogListContentProps> = ({ }) => {

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [color, setColor] = useState<string | undefined>("gold");

  const { data: dogs, isLoading, isFetching, error } = useDogs(limit);


  return (
    <>{JSON.stringify(dogs)}
      <Container type={ContainerType.SingleColumn} mainContent={<SelectedFilters />} />
      <Container type={ContainerType.LeftSidebar} mainContent={<Filter />} sidebarContent={<div>sdfsdf</div>} />
    </>
  )
}

export default DogListContent;