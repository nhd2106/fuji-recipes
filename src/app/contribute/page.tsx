/* eslint-disable @next/next/no-img-element */
"use client";

export const dynamic = "force-dynamic";

import { cloneDeep, set } from "lodash";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { XIcon } from "lucide-react";
import Compressor from "compressorjs";

import { Input } from "@/components/ui/input";
import Recipes from "@/modules/recipes/Recipes";
import WithAuth from "@/components/WithAuth";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import InputComponent from "@/modules/recipes/InputComponent";

function Contribute() {
  const { user } = useKindeBrowserClient();
  const [images, setImages] = useState<any[]>([]);
  const [recipe, setRecipe] = useState<any>({});

  const [handling, setHandling] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles: any) => {
    setUploading(true);
    const newImages = [] as any[];
    const commpressedImages = acceptedFiles.map(
      (file: any) =>
        new Promise((resolve, reject) => {
          new Compressor(file, {
            quality: 0.5,
            success(result) {
              newImages.push(result);
              resolve(result);
            },
            error(err) {
              console.log(err.message);
              reject(err);
            },
          });
        })
    );
    Promise.all(commpressedImages).then(() => {
      setImages(newImages as any);
      setUploading(false);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  const handleUpload = async () => {
    setHandling(true);
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("files", image);
    });

    try {
      formData.append(
        "recipe",
        JSON.stringify({
          ...recipe,
          userId: user?.id,
          email: user?.email,
          category: recipe.category || "random",
        })
      );

      const host = process.env.NEXT_PUBLIC_SITE_URL;
      const url = `${host}/api/create-recipe`;
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data?.id) {
        router.push(`/recipes/${data.id}`);
      }
    } catch (error) {
      console.log(error);
      setHandling(false);
    }
  };

  return (
    <div className="p-5 relative max-w-7xl w-full mx-auto">
      <h1 className="text-3xl mb-5 text-blue-600">Tạo Film Simulation</h1>
      <Button
        className={clsx(
          "bg-blue-600 text-white",
          "hover:bg-blue-700",
          "focus:ring-2 focus:ring-blue-600",
          handling && "cursor-not-allowed",
          handling && "opacity-50",
          "transition-all duration-200",
          "fixed  right-5 bottom-5 "
        )}
        onClick={handleUpload}
        handling={handling}
      >
        {handling ? "Đang xử lý..." : "Tạo công thức"}
      </Button>
      <div className="my-5">
        <div className="flex w-full items-center space-x-4">
          <div className="flex-1">
            <label className="font-semibold my-5">Tên công thức</label>
            <Input
              type=""
              value={recipe.name}
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} // eslint-disable-line
            />
          </div>
          <div className="my-5 flex-1">
            <label className="font-semibold my-5">Category</label>
            <InputComponent
              options={["sea-side-view", "street", "forest", "random"]}
              type="select"
              value={recipe.category}
              onChange={(val) => {
                setRecipe({ ...recipe, category: val });
              }}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-5 gap-2 md:gap-8 grid-cols-2">
          <Recipes
            onChange={(path: string, val: any) => {
              const newRecipe = { ...recipe };
              set(newRecipe, path, val);
              setRecipe(newRecipe);
            }}
            recipe={recipe}
            handling={handling}
          />
        </div>
        <h2>Sample Images</h2>
        <div {...getRootProps()} className="border-2 border-dashed p-4">
          <input
            {...getInputProps()}
            className={cn(
              "w-full h-full",
              "cursor-pointer",
              "opacity-0",
              "absolute",
              "top-0",
              "left-0"
            )}
          />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop some files here, or click to select files</p>
          )}
          {uploading && (
            <p className="text-blue-600">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang tải lên...
            </p>
          )}
        </div>
        {images.length > 0 && (
          <div>
            <h2>Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {images.map((file, index) => (
                <div key={index} className="relative grid gap-4">
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-full h-auto object-cover rounded-md"
                  />
                  <Input
                    type="text"
                    value={recipe.images?.[index]?.name}
                    onBlur={(e) => {
                      const imageClone = images[index];
                      const blob = imageClone.slice(
                        0,
                        imageClone.size,
                        "image/jpeg"
                      );
                      const newImage = new File([blob], e.target.value, {
                        type: imageClone.type,
                      });
                      const newImages = cloneDeep(images);
                      newImages[index] = newImage;
                      setImages(newImages);
                    }}
                    placeholder="Tên ảnh"
                    className="w-full"
                  />

                  <Button
                    size={"icon"}
                    variant={"default"}
                    color="red"
                    className="absolute top-3 right-3"
                    onClick={() => {
                      const newImages = images.filter((_, i) => i !== index);
                      setImages(newImages);
                    }}
                  >
                    <span>
                      <XIcon />
                    </span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WithAuth(Contribute);
