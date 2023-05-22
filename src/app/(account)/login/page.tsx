"use client";
import { useUsers } from "@/app/hooks/api/useDogs";

export default function Login() {
  const {data: users, isLoading} = useUsers();

  return (
    <div>{isLoading ? "Loading content" : <>{JSON.stringify(users)}</>}</div>
  )
}

