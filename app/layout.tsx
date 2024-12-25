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
  const session = await getServerSession();
  return (
    <html lang='en'>
      <body
        className={`${inter.className} ${geistMono.variable} antialiased bg-[#EAEEFE]`}>
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
