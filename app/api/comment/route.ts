/** @format */

import {
  addComment,
  createLaporan,
  deleteLaporan,
  getAllLaporan,
  getComment,
  getLaporanbyUserId,
  loginUser,
  updateLaporan,
} from "@/lib/prisma/service";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const cursor = request.nextUrl.searchParams.get("cursor") || undefined;
  const laporanId = request.nextUrl.searchParams.get("id");

  const pageSize = 5;
  const res = await getComment(cursor, pageSize, laporanId);

  if (res && res.komentar.length > 0) {
    return NextResponse.json({ status: "success", data: res }, { status: 200 });
  } else {
    return NextResponse.json(
      { status: "error", message: "Data tidak ditemukan" },
      { status: 404 }
    );
  }
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }
  const comment = await addComment(req);
  const laporan = await prisma.laporan.findUnique({
    where: {
      id: req.laporanId,
    },
    select: {
      userId: true,
    },
  });

  if (!laporan) {
    return NextResponse.json(
      { status: "error", message: "Laporan not found" },
      { status: 404 }
    );
  }

  if (comment) {
    if (laporan.userId !== session.user.id) {
      console.log("tes2");
      await prisma.notification.create({
        data: {
          senderId: session.user.id,
          receiverId: laporan.userId,
          laporanId: req.laporanId,
          notifType: "comment",
          message: req.isi,
        },
      });
    }
    return NextResponse.json(
      { status: "success", data: comment.data },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { status: "error", message: "Data tidak ditemukan" },
      { status: 404 }
    );
  }
}
