"use client";

import { imageKitLoader } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

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
  return (
    <Image
      loader={imageKitLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
};

export default MyImage;
