import prisma from "@/lib/prisma";
import ImageKit from "imagekit";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = (await req.formData()) as any;
  const recipe = (formData.get("recipe") as any) ?? [];
  const files = formData.getAll("files") as [File];
  const needToParse = ["toneCurve", "grainEffect"];
  const parsedRecipe = JSON.parse(recipe);
  const cleanRecipe = Object.keys(parsedRecipe).reduce((acc: any, key) => {
    if (needToParse.includes(key)) {
      acc[key] = JSON.stringify(parsedRecipe[key]);
    } else {
      acc[key] = parsedRecipe[key];
    }
    return acc;
  }, {});

  try {
    let uploadImages = [];
    const data = {
      ...cleanRecipe,
    };
    if (files.length > 0) {
      uploadImages = (await Promise.all(
        files.map(async (image) => {
          const imageKit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
          });
          const url = await imageKit.upload({
            file: Buffer.from(await image.arrayBuffer()),
            fileName: image.name,
          });
          return url;
        })
      )) as any;
      if (uploadImages.length > 0) {
        data.mainImage = uploadImages[0].url;
        const res = await prisma.recipe.create({
          data: {
            ...cleanRecipe,
            mainImage: uploadImages[0].url,
          },
        });
        if (res && uploadImages.length > 0) {
          await prisma.imageKitImage.createMany({
            data: uploadImages.map(
              ({ AITags, versionInfo, size, ...rest }: any) => ({
                ...rest,
                recipeId: res.id,
              })
            ),
          });
        }

        return Response.json(res, { status: 200 });
      }
      return Response.json({ message: "Error creating recipe" }, { status: 500 });
    }
    return Response.json({ message: "Error creating recipe" }, { status: 500 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error creating recipe" }, { status: 500 });
  }
}
