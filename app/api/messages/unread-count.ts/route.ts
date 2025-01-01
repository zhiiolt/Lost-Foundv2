/** @format */

import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma/db";
import streamServerClient from "@/lib/stream";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { total_unread_count } = await streamServerClient.getUnreadCount(
    session.user.id
  );

  const data = {
    unreadCount: total_unread_count,
  };

  return NextResponse.json(data);
}
