"use client";

import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient();

  if (pathname === "/login") {
    return <div></div>;
  }

  return (
    <nav className=" static h-14 inset-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40  font-semibold ">
            <span>Fuji-Mates.</span>
          </Link>
          {/* todo add mobile nav */}
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
    </nav>
  );
};

export default Header;
