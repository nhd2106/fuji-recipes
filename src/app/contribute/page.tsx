/* eslint-disable @next/next/no-img-element */
"use client";

import { set } from "lodash";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import Recipes from "@/modules/recipes/Recipes";
import WithAuth from "@/components/WithAuth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

function Contribute() {
  const { user } = useKindeBrowserClient();
  const [images, setImages] = useState<any[]>([]);
  const [recipe, setRecipe] = useState<any>({});
  const [handling, setHandling] = useState(false);
  const onDrop = useCallback((acceptedFiles: any) => {
    setImages(acceptedFiles);
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
    formData.append(
      "recipe",
      JSON.stringify({
        ...recipe,
        userId: user?.id,
        email: user?.email,
      })
    );

    try {
      const res = await fetch("/api/create-recipe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return redirect(`/recipes/${data.id}`);
    } catch (error) {
      console.log(error);
      setHandling(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl mb-5 text-blue-600">Tạo Film Simulation</h1>
      <Button
        className={handling ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"}
        onClick={handleUpload}
        handling={handling}
      >
        {handling ? "Đang xử lý..." : "Tạo công thức"}
      </Button>
      <div className="my-5">
        <label className="font-semibold my-5">Tên công thức</label>
        <Input
          type="text"
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} // eslint-disable-line
        />
      </div>
      <div className="grid md:grid-cols-5 gap-8">
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
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      {images.length > 0 && (
        <div>
          <h2>Preview</h2>
          <div className="grid grid-cols-4 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative grid gap-4">
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="w-full h-auto object-cover rounded-md"
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
  );
}

export default WithAuth(Contribute);
