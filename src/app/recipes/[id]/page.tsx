import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MyImage from "@/components/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parsedFields, ingredients } from "@/utils";
import _, { get } from "lodash";
import Link from "next/link";

import {
  Camera,
  Film,
  Scale,
  Sun,
  Sparkle,
  Paintbrush,
  Eye,
  Filter,
  User,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Actions from "@/modules/recipe/Actions";
const icons = {
  filmSimulation: <Film size={24} />,
  cameraModel: <Camera size={24} />,
  whiteBalance: <Scale size={24} />,
  dynamicRange: <Sun size={24} />,
  grainEffect: <Sparkle size={24} />,
  color: <Paintbrush size={24} />,
  sharpness: <Eye size={24} />,
  noiseReduction: <Filter size={24} />,
};

const getRecipe = async (id: string) => {
  const host = process.env.NEXT_PUBLIC_SITE_URL;
  const response = await fetch(`${host}/api/recipes/${id}`, {
    method: "GET",
    headers: {
      contentType: "application/json",
    },
    cache: "no-cache",
  });
  const recipe = await response.json();
  return recipe;
};

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const res = await getRecipe(params.id);
  const {
    id,
    name,
    description,
    images,
    cameraModel,
    createdAt,
    updatedAt,
    userId,
    mainImage,
    email,
    likes,
    ...others
  } = res;

  return (
    <MaxWidthWrapper>
      <div className="">
        <h1 className="text-2xl md:text-2xl lg:text-4 xl my-6 font-semibold">
          {name}
        </h1>
      </div>
      <p>{description}</p>
      <div className="my-8">
        <div className="my-3">
          Ngày tạo:{" "}
          {new Date(createdAt).toLocaleDateString("vi-vn", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <Actions recipeId={id} likes={likes} />
        <div className="flex items-baseline ">
          <User size={24} className="mr-2" />
          <Link
            href={`
          /recipes?user=${userId}&email=${email}
          `}
            className="text-sm font-bold"
          >
            {email}
          </Link>
        </div>
      </div>
      <div>
        <div className="grid gap-1 md:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text">Camera</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {get(icons, "cameraModel", "")}
              </div>
            </CardHeader>
            <CardContent>
              <Link
                href={`/recipes?cameraModel=${cameraModel}`}
                className="text-lg md:text-xl font-bold text-blue-600 flex items-center"
              >
                {cameraModel}
                <Tag size={24} className="ml-3" />
              </Link>
            </CardContent>
          </Card>
          {Object.entries(others || {})
            .filter(([_, val]) => val)
            .map(([key, val]: [any, any]) => {
              let value = val;
              const { name, child } =
                ingredients.find((i) => i.key === key) ?? {};
              if (parsedFields.includes(key)) {
                value = JSON.parse(val);
                return (
                  <Card key={key}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium ">
                        {name || key}
                      </CardTitle>
                      <span className="h-4 w-4 text-muted-foreground">
                        {get(icons, key, "")}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <div>
                        {Object.entries(value).map(([k, v]: [string, any]) => {
                          const { name: cName } =
                            child?.find((c) => c.key === k) ?? {};
                          return (
                            <div className="text-md font-bold" key={k}>
                              {cName}: {v}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              }
              return (
                <Card key={key}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {name || key}
                    </CardTitle>
                    <span className="h-4 w-4 text-muted-foreground">
                      {get(icons, key, "")}
                    </span>
                  </CardHeader>
                  <CardContent>
                    {key === "filmSimulation" ? (
                      <Link
                        href={`/recipes?filmSimulation=${value}`}
                        className="text-lg md:text-xl font-bold text-blue-600 flex items-center"
                      >
                        {value}
                        <Tag size={24} className="ml-3" />
                      </Link>
                    ) : (
                      <div className="text-md font-bold">{value}</div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
      <div>
        <h2 className="my-5">
          <span className="text-2xl font-bold">Hình tham khảo</span>
        </h2>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {_.orderBy(images, "orientation", "desc").map((image: any) => {
              return (
                <div
                  className={cn(
                    "grid gap-3 md:gap-4 items-center justify-center rounded-md",
                    image.orientation === 1
                      ? "md:bg-gray-500 sm:p-32 sm:px-1 sm:border-white sm:border-2 sm:border-solid bg-transparent "
                      : ""
                  )}
                  key={image.fileId}
                >
                  <MyImage
                    src={image.url}
                    alt={image.name}
                    width={400}
                    height={400}
                    className=" relative rounded-md object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
