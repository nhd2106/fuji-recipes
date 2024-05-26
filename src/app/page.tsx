import MyImage from "@/components/MyImage";
import { Recipe } from "@/types/recipes";
import Link from "next/link";
import { WobbleCard } from "@/components/ui/wobble-card";

export const dynamic = "force-dynamic";

const getRecipes = async ({
  take = 10,
  order = "desc",
}: {
  take?: number;
  order?: "asc" | "desc";
} = {}): Promise<Recipe[]> => {
  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
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
    <main className="flex min-h-screen flex-col items-center justify-between max-w-7xl mx-auto w-full my-5 md:p-24 p-5">
      <h1 className="max-w-4xl text-2xl sm:text-3xl font-bold md:text-4xl lg:text-5xl mb-8 sm:mb-20">
        Create your <span className="text-blue-600">recipes </span>
        and share it with the world.
      </h1>
      <div>
        <section className="max-w-7xl mx-auto w-full my-5">
          <h2 className="text-xl sm:text-2xl my-4 font-bold">
            What will you shoot next?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
              bgImage="/forest.webp"
              link="/recipes?category=forest"
              blurDataURL="LQHTK%0}}[^PNGjER%NG9[V[9[Sg"
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-2xl md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  In the forest
                </h2>
              </div>
            </WobbleCard>
            <WobbleCard
              containerClassName="col-span-1 min-h-[300px]"
              bgImage="/street.webp"
              link="/recipes?category=street"
              blurDataURL="LTGbhs%1xZs:~qt6ofj[0$WqWXWC"
            >
              <h2 className="max-w-80 text-2xl  text-left text-balance  md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Street and city view
              </h2>
            </WobbleCard>
            <WobbleCard
              link="/recipes?category=sea-side-view"
              containerClassName="col-span-1 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
              bgImage="/sea.webp"
              blurDataURL="LTGR|{%1xZs:~qt6ofj[0$WqWXWC"
            >
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-2xl md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Sea side view
                </h2>
              </div>
            </WobbleCard>
            <WobbleCard
              link="/recipes?category=random"
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
              bgImage="/random.webp"
              blurDataURL="LGC%Wz-:jK%g_MbHoNx]tSbbaix]"
            >
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-2xl md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Random pictrues
                </h2>
              </div>
            </WobbleCard>
          </div>
        </section>
        <section>
          <h2 className="mb-10">
            <span className="text-2xl font-bold">Latest Recipes</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        </section>
      </div>
    </main>
  );
}

export default Home;
