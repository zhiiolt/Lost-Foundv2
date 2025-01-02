/** @format */

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { getSession } from "next-auth/react";
import Providers from "./provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ReactQueryProvider from "./ReactQueryProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./api/uploadthing/core";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang='en'>
      <body
        className={`${inter.className} ${geistMono.variable} antialiased bg-[#EAEEFE]`}>
        <Providers session={session}>
          <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
          <ReactQueryProvider>
            <EdgeStoreProvider>
              {children}

              <Toaster />
            </EdgeStoreProvider>
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}
