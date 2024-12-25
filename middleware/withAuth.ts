/** @format */

import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[]
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const authPath = ["/login", "/register", "/"];
    // Periksa apakah URL cocok dengan salah satu rute yang membutuhkan autentikasi
    const isAuthRequired = requireAuth.some((route) => {
      // Tangani rute dinamis seperti /laporan/[slug]
      if (route.includes("[") && route.includes("]")) {
        const dynamicRoute = new RegExp(
          `^${route.replace(/\[.*?\]/g, "[^/]+")}$` // Ganti [slug] dengan pola satu segmen
        );
        return dynamicRoute.test(pathname);
      }

      // Tangani rute statis
      return route === pathname || pathname.startsWith(`${route}/`);
    });

    if (isAuthRequired) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token && !authPath.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token) {
        if (authPath.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}
