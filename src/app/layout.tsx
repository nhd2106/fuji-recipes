import type { Metadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const host = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: "Fuji Recipes",
    description: "Fuji Recipes - Create and share your own recipes. 🍣 ",
    metadataBase: new URL(host || ""),

    openGraph: {
      title: "Fuji Recipes",
      description: "Fuji Recipes - Create and share your own recipes. 🍣 ",
      type: "website",
      url: host,
      images: `${host}/fujifilm-recipes.jpeg`,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
