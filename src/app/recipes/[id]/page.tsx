import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MyImage from "@/components/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parsedFields, ingredients } from "@/utils";
import { get } from "lodash";
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
  const host = process.env.NEXT_PUBLIC_URL;
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
    ...others
  } = res;

  return (
    <MaxWidthWrapper>
      <h1 className="text-xl md:text-2xl lg:text-4 xl my-6">{name}</h1>
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
        <div className="flex items-center ">
          <User size={24} />
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Camera</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {get(icons, "cameraModel", "")}
              </div>
            </CardHeader>
            <CardContent>
              <Link
                href={`/recipes?cameraModel=${cameraModel}`}
                className="text-2xl font-bold text-blue-600 flex items-center"
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
                      <CardTitle className="text-sm font-medium">
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
                        className="text-xl font-bold text-blue-600 flex items-center"
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
        <h2 className="mb-5">
          <span className="text-2xl font-bold">Hình tham khảo</span>
        </h2>
        <div className="flex justify-center flex-col gap-1 md:gap-4 items-center">
          {images.map((image: any) => {
            return (
              <MyImage
                key={image.fileId}
                src={image.url}
                alt={image.name}
                width={400}
                height={400}
                className="grid gap-1 md:gap-4 relative rounded-md h-auto w-9/10 md:p-0 md:w-3/5  object-cover"
              />
            );
          })}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
