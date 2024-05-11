"use client";

import { redirect } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Loading from "../Loading";

export default function WithAuth(Conponent: any) {
  return function WithAuth(props: any) {
    const { isAuthenticated, isLoading } = useKindeBrowserClient();
    if (isLoading) {
      return <Loading />;
    }
    if (!isAuthenticated) {
      redirect("/login");
    }
    return <Conponent {...props} />;
  };
}
