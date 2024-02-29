"use client";

import { cn, imageKitLoader } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

const MyImage = ({
  alt,
  src,
  width,
  height,
  className,
  ...props
}: {
  alt: string;
  src: string;
  width: number;
  height: number;
  className?: string;
} & ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      loader={imageKitLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onLoad={() => setLoaded(true)}
      className={cn(
        className,
        loaded
          ? `${className} transition-opacity duration-500 ease-in-out opacity-100`
          : `${className} transition-opacity duration-500 ease-in-out opacity-0`
      )}
      {...props}
    />
  );
};

export default MyImage;
