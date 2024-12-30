/** @format */

import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma/db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const unreadCount = await prisma.notification.count({
    where: {
      receiverId: session.user.id,
      isRead: false,
    },
  });

  const data = {
    unreadCount,
  };

  return NextResponse.json(data);
}
