import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative h-screen">
      <div className="absolute top-48 left-1/2 translate-x-[-50%] text-center w-1/2 bg-black opacity-60 p-10 rounded-lg">
        <h1 className="text-6xl text-white">404 - Page Not Found</h1>
        <Link className="text-white text-5xl flex justify-center" href="/">
          <span className="flex items-center justify-center mt-5  hover:text-yellow-500">
            <HomeIcon size="30px" className="mr-2" />
            Go Home
          </span>
        </Link>
      </div>
      <Image
        src="/not-found.webp"
        width={500}
        height={500}
        alt="404"
        className="rounded-lg h-auto w-full object-cover"
      />
    </div>
  );
}
