import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MyImage from "@/components/MyImage";
import { Recipe } from "@/types/recipes";
import { User } from "lucide-react";
import Link from "next/link";

async function getRecipes({
  take = 10,
  order = "desc",
  user = "",
  cameraModel = "",
  filmSimulation = "",
}: {
  take?: number;
  order?: "asc" | "desc";
  user?: string;
  cameraModel?: string;
  filmSimulation?: string;
} = {}) {
  let url = `${process.env.NEXT_PUBLIC_URL}/api/get-recipes?take=${take}&order=${order}`;
  if (user) {
    url = `${url}&userId=${user}`;
  }
  if (cameraModel) {
    url = `${url}&cameraModel=${cameraModel}`;
  }
  if (filmSimulation) {
    url = `${url}&filmSimulation=${filmSimulation}`;
  }
  console.log(url);
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
  const { user, email, cameraModel, filmSimulation } = searchParams as any;
  const recipes = await getRecipes({ user, cameraModel, filmSimulation });

  return (
    <MaxWidthWrapper>
      <h1 className="text-xl md:text-2xl lg:text-3xl my-5">Đóng góp của</h1>
      <div className="flex items-center my-5">
        <User size={24} />
        <span className="font-semibold">{email}</span>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(recipes || []).map((recipe, i) => (
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
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
