"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, User } from "lucide-react";
import useRecipes from "@/querries/recipes";
import { Recipe } from "@/types/recipes";
import Link from "next/link";
import Image from "next/image";
import MyImage from "@/components/MyImage";

function Page() {
  const { user, isLoading } = useKindeBrowserClient();
  const { data: recipes, isFetching } = useRecipes(user?.id ?? "");

  return (
    <MaxWidthWrapper>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
            <div className="flex flex-col items-center space-y-3">
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
                {isFetching ? (
                  <div>Loading...</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(recipes || []).length ? (
                      (recipes || []).map((recipe: Recipe) => (
                        <Link
                          className="grid gap-4 relative"
                          href={`/recipes/${recipe.id}`}
                          key={recipe.id}
                        >
                          <MyImage
                            src={recipe.mainImage}
                            alt={recipe.name}
                            width={400}
                            height={400}
                            className="rounded-lg h-auto w-full object-cover"
                          />
                          <div className="absolute top-2 right-2 md:top-5 md:right-5 text-yellow-400 bg-black bg-opacity-50 p-1 md:p-4 rounded-md">
                            <h3 className="text-xs md:first-line:text-lg font-bold">
                              {recipe.name}
                            </h3>
                            <p className="text-xs md:text-sm">
                              Camera: {recipe.cameraModel}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div>
                        <h3 className="text-xl font-bold">
                          Bạn chưa có giả lập nào 🤔
                        </h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </MaxWidthWrapper>
  );
}

export default Page;
