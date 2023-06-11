"use client";

import { useDogs } from "@/app/hooks/api/useDogs";
import React from "react";

export default function ListDogs() {

  const { data: dogs, isLoading, isFetching, error } = useDogs();

  return (
    <>{JSON.stringify(dogs)}
    </>
  );
}