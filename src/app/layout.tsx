import type { Metadata } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { siteConfig } from "./site-config";
import Navbar from "./ui/navbar";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar
          brandTitle={siteConfig.title}
          navItems={siteConfig.navItems}
          searchAction={siteConfig.actions.search}
          cartAction={siteConfig.actions.cart}
        />
        {children}
      </body>
    </html>
  );
}
