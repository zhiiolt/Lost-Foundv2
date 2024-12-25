/** @format */

import {
  createLaporan,
  getAllLaporan,
  loginUser,
  updateLaporan,
} from "@/lib/prisma/service";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import _ from "lodash";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const res = await getAllLaporan();
  if (res && res.length > 0) {
    return NextResponse.json({ status: "success", data: res }, { status: 200 });
  } else {
    return NextResponse.json(
      { status: "error", message: "Data tidak ditemukan" },
      { status: 404 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const email = session?.user?.email || "";
  const user = await loginUser({ email });
  const req = await request.formData();
  const image = req.get("foto") as File;
  const buffer = Buffer.from(await image.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error while checking upload directory", e);
      return NextResponse.json(
        { status: "error", message: "Gagal menyimpan laporan" },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;
    const newLaporan = {
      jenis: req.get("jenis"),
      status: req.get("status"),
      judul: req.get("judul"),
      deskripsi: req.get("deskripsi"),
      namaBarang: req.get("namaBarang"),
      kategori: req.get("kategori"),
      tanggal: req.get("tanggal"),
      ciri: req.get("ciri"),
      lokasi: req.get("lokasi"),
      fotoUrl: fileUrl,
      userId: user?.id,
    };
    const result = await createLaporan(newLaporan);
    if (result.status) {
      return NextResponse.json(
        { status: "success", data: result.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "error", message: "Gagal menyimpan laporan" },
        { status: 500 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: `Gagal menyimpan laporan ${e}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const req = await request.formData();
  const image = req.get("foto");
  if (image instanceof File) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error("Error while checking upload directory", e);
        return NextResponse.json(
          { status: "error", message: "Gagal menyimpan laporan" },
          { status: 500 }
        );
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;
      const newLaporan = {
        id: req.get("id"),
        jenis: req.get("jenis"),
        status: req.get("status"),
        judul: req.get("judul"),
        deskripsi: req.get("deskripsi"),
        namaBarang: req.get("namaBarang"),
        kategori: req.get("kategori"),
        tanggal: req.get("tanggal"),
        ciri: req.get("ciri"),
        lokasi: req.get("lokasi"),
        fotoUrl: fileUrl,
      };
      const result = await updateLaporan(newLaporan);
      if (result.status) {
        return NextResponse.json(
          { status: "success", data: result.data },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { status: "error", message: "Gagal mengedit laporan" },
          { status: 500 }
        );
      }
    } catch (e) {
      return NextResponse.json(
        { status: "error", message: `Gagal mengedit laporan ${e}` },
        { status: 500 }
      );
    }
  } else if (typeof image === "string") {
    const newLaporan = {
      id: req.get("id"),
      jenis: req.get("jenis"),
      status: req.get("status"),
      judul: req.get("judul"),
      deskripsi: req.get("deskripsi"),
      namaBarang: req.get("namaBarang"),
      kategori: req.get("kategori"),
      tanggal: req.get("tanggal"),
      ciri: req.get("ciri"),
      lokasi: req.get("lokasi"),
      fotoUrl: req.get("foto"),
    };
    const result = await updateLaporan(newLaporan);
    if (result.status) {
      return NextResponse.json(
        { status: "success", data: result.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "error", message: "Gagal mengedit laporan" },
        { status: 500 }
      );
    }
  }
}