"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <MaxWidthWrapper>
      <div className="h-screen py-32 sm:py-0 grid grid-cols-1 sm:grid-cols-2 justify-center items-center ">
        <div className="flex flex-col justify-center items-center order-1 sm:order-2">
          <h1 className="text-4xl my-10">Vui lòng đăng nhập</h1>
          <div className="flex items-center space-x-4">
            <div className="flex">
              <Link
                href="/"
                className={buttonVariants({
                  variant: "link",
                })}
              >
                <HomeIcon size={24} />
                <span className="ml-2">Trang chủ</span>
              </Link>
            </div>
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
