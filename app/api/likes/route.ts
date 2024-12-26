/** @format */

import { likes } from "@/lib/prisma/service";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const req = await request.json();

  if (req.likes === "true") {
    const data = {
      laporanId: req.laporanId,
      userId: req.userId,
    };
    const res = await likes(true, data);
    if (res.status) {
      return NextResponse.json(
        { status: "success", message: res.message, data: res.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "error", message: res.message },
        { status: 400 }
      );
    }
  } else {
    const data = {
      id: req.id,
      laporanId: req.laporanId,
      userId: req.userId,
    };
    const res = await likes(false, data);
    if (res.status) {
      return NextResponse.json(
        { status: "success", message: res.message, data: res.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "error", message: res.message },
        { status: 400 }
      );
    }
  }
}
