/** @format */

import { findUserbyEmail, loginUser, registerUser } from "@/lib/prisma/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("email");
  const res = await findUserbyEmail(query);
  return NextResponse.json(res);
}
