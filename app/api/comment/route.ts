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
  const comment = await addComment(req);
  if (comment) {
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
