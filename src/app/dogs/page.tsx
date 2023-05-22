"use client";

import React from "react";
import { useDogs } from "../hooks/api/useDogs";

export default function ListDogs() {

  const { data: dogs, isLoading, isFetching, error } = useDogs();

  return (
    <>{JSON.stringify(dogs)}
    </>
  );
}