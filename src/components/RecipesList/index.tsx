import { Recipe } from "@/types/recipes";
import Link from "next/link";
import MyImage from "../MyImage";

function RecipesList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 md:p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-400 to-blue-900">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(recipes || []).map((recipe: any) => (
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
              <p className="text-xs md:text-sm">Camera: {recipe.cameraModel}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipesList;
