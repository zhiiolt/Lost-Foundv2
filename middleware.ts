/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middleware/withAuth";

export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/dashboard",
  "/laporan",
  "/profil",
  "/map",
  "/chat",
  "/login",
  "/register",
]);
