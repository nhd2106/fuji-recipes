"use client";

import { imageKitLoader } from "@/lib/utils";
import Image from "next/image";

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
}) => {
  return (
    <Image
      loader={imageKitLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwAB/9g9ZAAAAABJRU5ErkJggg=="
      {...props}
    />
  );
};

export default MyImage;
