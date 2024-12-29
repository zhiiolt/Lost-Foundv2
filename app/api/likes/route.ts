/** @format */

import { likes } from "@/lib/prisma/service";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma/db";

export async function GET(request: NextRequest) {
  const laporanId = request.nextUrl.searchParams.get("id") || "";
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }
  const laporan = await prisma.laporan.findUnique({
    where: {
      id: laporanId,
    },
    select: {
      likes: {
        where: {
          userId: session.user.id,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!laporan) {
    return NextResponse.json(
      { status: "error", message: "Laporan not found" },
      { status: 404 }
    );
  }

  const data = {
    likes: laporan._count.likes,
    isLiked: !!laporan.likes.length,
  };

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const laporanId = request.nextUrl.searchParams.get("id") || "";
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  await prisma.likes.upsert({
    where: {
      userId_laporanId: {
        userId: session.user.id,
        laporanId: laporanId,
      },
    },
    create: {
      userId: session.user.id,
      laporanId: laporanId,
    },
    update: {},
  });

  return NextResponse.json({ status: "success" });
}

export async function DELETE(request: NextRequest) {
  const laporanId = request.nextUrl.searchParams.get("id") || "";
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  await prisma.likes.deleteMany({
    where: {
      userId: session.user.id,
      laporanId: laporanId,
    },
  });

  return NextResponse.json({ status: "success" });
}
