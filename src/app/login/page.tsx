"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

export default function Login() {
  return (
    <MaxWidthWrapper>
      <div className="h-screen grid grid-cols-2 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl my-10">Vui lòng đăng nhập</h1>
          <div>
            <LoginLink className={buttonVariants()}>Đăng nhập</LoginLink>
          </div>
          <div className="mt-5">
            bạn chưa có tài khoản?{" "}
            <RegisterLink
              className={buttonVariants({
                variant: "link",
              })}
            >
              Đăng ký
            </RegisterLink>
          </div>
        </div>
        <div>
          <Image
            src="/fujifilm-recipes.jpeg"
            alt="fujifilm-recipes"
            width={1000}
            height={1000}
            className="rounded-xl "
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
