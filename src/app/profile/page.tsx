"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, User } from "lucide-react";
import { useRecipes } from "@/querries/recipes";
import SavedRecipes from "@/modules/profile/SavedRecipes";
import RecipesList from "@/components/RecipesList";
import Loading from "../loading";

function Page() {
  const { user, isLoading } = useKindeBrowserClient();
  const { data: recipes } = useRecipes(user?.id ?? "");

  return isLoading ? (
    <Loading />
  ) : (
    <MaxWidthWrapper>
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          space-y-4
          mt-4
        "
      >
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">
          Thông tin tài khoản
        </h1>
        {user && (
          <div className="w-full">
            <Avatar>
              <AvatarImage sizes="3000" src={user?.picture ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-5">
              <div className="flex items-center space-x-1">
                <User size={24} />
                <span className="ml-2">
                  {user.given_name} {user.family_name}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={24} />
                <span className="ml-2">{user.email}</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold my-5">
                Các giả lập film của bạn 📸
              </h2>
              {recipes?.length ? (
                <RecipesList recipes={recipes} />
              ) : (
                <p>Bạn chưa có giả lập nào</p>
              )}

              <SavedRecipes />
            </div>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
