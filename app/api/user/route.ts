/** @format */

import prisma from "@/lib/prisma/db";
import { findUserbyEmail, loginUser, registerUser } from "@/lib/prisma/service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.has("email")) {
    const query = searchParams.get("email");
    const res = await findUserbyEmail(query);
    return NextResponse.json(res);
  } else {
    const user = await prisma.user.findMany({
      where: {
        NOT: {
          id: session?.user.id,
        },
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        profile: {
          select: {
            avatarUrl: true,
          },
        },
      },
    });
    return NextResponse.json(user);
  }
}
