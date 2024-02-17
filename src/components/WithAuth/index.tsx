import { redirect } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function WithAuth(Conponent: any) {
  return function WithAuth(props: any) {
    const { isAuthenticated, isLoading } = useKindeBrowserClient();
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
      redirect("/login");
    }
    return <Conponent {...props} />;
  };
}
