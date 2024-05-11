"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { useSavedRecipes } from "@/querries/recipes";
import RecipesList from "@/components/RecipesList";

function SavedRecipes() {
  const { user } = useKindeBrowserClient();
  const { data: recipes, isLoading } = useSavedRecipes(user?.id);
  return isLoading ? (
    <div>
      <h3 className=" text-xl ">Loading...</h3>
    </div>
  ) : recipes ? (
    <div>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold my-5">
        Các giả lập film đã lưu 📸
      </h2>
      <div>
        {recipes.length > 0 ? (
          <RecipesList recipes={recipes} />
        ) : (
          <p>Bạn chưa lưu giả lập nào</p>
        )}
      </div>
    </div>
  ) : null;
}

export default SavedRecipes;
