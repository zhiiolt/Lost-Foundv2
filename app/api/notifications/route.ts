/** @format */

import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma/db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const cursor = request.nextUrl.searchParams.get("cursor");
  const pageSize = 3;
  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const notification = await prisma.notification.findMany({
    where: {
      receiverId: session.user.id,
    },
    include: {
      sender: {
        include: {
          profile: true,
        },
      },
      laporan: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
          comments: {
            include: {
              user: {
                include: {
                  profile: true,
                },
              },
            },
          },
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  const nextCursor =
    notification.length > pageSize ? notification[pageSize].id : null;
  const data = {
    notification: notification.slice(0, pageSize),
    nextCursor,
  };

  return NextResponse.json(data);
}
