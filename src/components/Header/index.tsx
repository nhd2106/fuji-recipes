"use client";

import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Plus, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import clsx from "clsx";

const Header = () => {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  if (pathname === "/login") {
    return <div></div>;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useOnClickOutside(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <nav className=" relative h-14 inset-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40  font-semibold ">
            <span>Fuji-Mates.</span>
          </Link>
          {/* todo add mobile nav */}
          <button
            onClick={toggleMenu}
            className="block sm:hidden p-2"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="https://www.buymeacoffee.com/duocngo95n"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Buy me a coffee
              </Link>

              {user && (
                <Link
                  className={buttonVariants({
                    size: "sm",
                  })}
                  href="/contribute"
                >
                  Tạo Recipe <Plus className="ml-1.5  h-5 w-5" />
                </Link>
              )}
              {user ? (
                <div className="hidden items-center space-x-4 sm:flex">
                  <>
                    <Link href="/profile">Tài khoản</Link>
                    <LogoutLink>
                      <button
                        className={buttonVariants({
                          variant: "ghost",
                          size: "sm",
                        })}
                      >
                        Đăng xuất
                      </button>
                    </LogoutLink>
                  </>
                </div>
              ) : (
                <LoginLink>
                  <button
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Đăng nhập
                  </button>
                </LoginLink>
              )}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
      <div
        style={{
          zIndex: 1000,
        }}
        ref={ref}
        className={clsx(
          " bg-white border-r border-gray-200   w-3/4 fixed h-screen top-0 -left-2  z-50 transition-all",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar content goes here */}
        <div className="p-4 grid grid-rows-1 grid-cols-1 justify-start">
          <h1 className="text-xl">
            <Link href="/">Fuji-Mates.</Link>
          </h1>
          <div className="mt-10">
            {user ? (
              <div className="flex flex-col ">
                <Link
                  className="text-lg"
                  href="/contribute"
                  onClick={toggleMenu}
                >
                  Tạo Recipe
                </Link>
                <Link onClick={toggleMenu} className="text-lg" href="/profile">
                  Tài khoản
                </Link>
                <LogoutLink onClick={toggleMenu} className="text-lg">
                  <button>Đăng xuất</button>
                </LogoutLink>
              </div>
            ) : (
              <div>
                <LoginLink onClick={toggleMenu} className="text-lg">
                  <button>Đăng nhập</button>
                </LoginLink>
              </div>
            )}
          </div>
          {/* Additional sidebar links */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
