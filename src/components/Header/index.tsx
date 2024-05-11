"use client";

import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import {
  Plus,
  Menu,
  Home,
  User,
  LogIn,
  PlusSquare,
  LogOut,
  XIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import clsx from "clsx";

const Header = () => {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient() || {};
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  if (["/login", "/register"].includes(pathname)) {
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
            <span>Fuji-X-Recipe</span>
          </Link>
          {/* todo add mobile nav */}
          <button
            onClick={toggleMenu}
            className="block sm:hidden p-2"
            aria-label="Menu"
          >
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
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
        <div className="p-4 grid grid-rows-1 grid-cols-1 justify-start bg-white">
          <h1 className="text-2xl mb-10">
            <Link href="/">
              <div className="flex items-center">
                <Home className="mr-2" /> {/* Home icon */}
                Fuji-X-Recipes
              </div>
            </Link>
          </h1>
          <div className="mt-10">
            {user ? (
              <div className="flex flex-col space-y-4">
                <Link href="/contribute" onClick={toggleMenu}>
                  <div className="flex items-center text-lg">
                    <PlusSquare className="mr-2" /> {/* Plus icon */}
                    Tạo Recipe
                  </div>
                </Link>
                <Link onClick={toggleMenu} href="/profile">
                  <div className="flex items-center text-lg">
                    <User className="mr-2" /> {/* User icon */}
                    Tài khoản
                  </div>
                </Link>
                <LogoutLink
                  onClick={toggleMenu}
                  className="text-lg absolute bottom-10"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2" /> {/* Sign out icon */}
                    Đăng xuất
                  </div>
                </LogoutLink>
              </div>
            ) : (
              <div>
                <LoginLink onClick={toggleMenu} className="text-lg">
                  <div className="flex items-center">
                    <LogIn className="mr-2" /> {/* Sign in icon */}
                    Đăng nhập
                  </div>
                </LoginLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
