import MyImage from "@/components/MyImage";
import { Recipe } from "@/types/recipes";
import Link from "next/link";

export const dynamic = "force-dynamic";

const getRecipes = async ({
  take = 10,
  order = "desc",
}: {
  take?: number;
  order?: "asc" | "desc";
} = {}): Promise<Recipe[]> => {
  const url = `${
    process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
  }/api/get-recipes?take=${take}&order=${order}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      contentType: "application/json",
    },
    cache: "no-cache",
  });

  const data = await res.json();
  return data;
};

async function Home() {
  const recipes = await getRecipes();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-24">
      <h1 className="max-w-4xl text-3xl font-bold md:text-4xl lg:text-5xl mb-20">
        Create your <span className="text-blue-600">recipes </span>
        and share it with the world.
      </h1>
      <div>
        <h2 className="mb-10">
          <span className="text-2xl font-bold">Latest Recipes</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(recipes || []).map((recipe) => (
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
    </main>
  );
}

export default Home;
