import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MyImage from "@/components/MyImage";
import { buttonVariants } from "@/components/ui/button";
import { Recipe } from "@/types/recipes";
import { PlusIcon, User } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";

async function getRecipes({
  take = 10,
  order = "desc",
  user = "",
  cameraModel = "",
  filmSimulation = "",
  category = "",
  ...other
}: {
  take?: number;
  order?: "asc" | "desc";
  user?: string;
  cameraModel?: string;
  filmSimulation?: string;
  category?: string;
} = {}) {
  let url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-recipes?take=${take}&order=${order}`;
  if (user) {
    url = `${url}&userId=${user}`;
  }
  if (cameraModel) {
    url = `${url}&cameraModel=${cameraModel}`;
  }
  if (filmSimulation) {
    url = `${url}&filmSimulation=${filmSimulation}`;
  }
  if (category) {
    url = `${url}&category=${category}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      contentType: "application/json",
    },
    cache: "no-cache",
  });

  const data = (await res.json()) as Recipe[];
  return data;
}

async function Page({
  searchParams,
}: {
  searchParams: URLSearchParams;
  params: { slug: string };
}) {
  const { user, email, cameraModel, filmSimulation, category } =
    searchParams as any;
  const recipes = await getRecipes({
    user,
    cameraModel,
    filmSimulation,
    category,
  });

  return (
    <MaxWidthWrapper>
      {user ? (
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl my-5">Đóng góp của</h1>
          <div className="flex items-baseline my-5">
            <User size={24} className="mr-2" />
            <span className="font-semibold">{email}</span>
          </div>
        </div>
      ) : (
        <h1 className="text-xl md:text-2xl lg:text-3xl my-5">
          Danh sách công thức
        </h1>
      )}
      <div>
        {(recipes || []).length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(recipes || []).length
              ? (recipes || []).map((recipe) => (
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
              : null}
          </div>
        ) : (
          <div className="w-full">
            <h2 className="text-xl my-5">
              Chưa có công thức nào của category này
            </h2>
            <div>
              <p>
                Bạn có thể đóng góp công thức bằng cách{" "}
                <Link
                  className={buttonVariants({
                    variant: "link",
                  })}
                  href="/contribute"
                >
                  Tạo mới
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
