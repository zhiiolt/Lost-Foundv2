/** @format */

import {
  createLaporan,
  deleteLaporan,
  getAllLaporan,
  getLaporanbyUserId,
  loginUser,
  updateLaporan,
  updateProfil,
} from "@/lib/prisma/service";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function PUT(request: NextRequest) {
  const req = await request.formData();
  console.log(req);
  const image = req.get("foto");
  if (image instanceof File) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/avatar/${new Date(Date.now())
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
      const newProfil = {
        id: req.get("id"),
        fullname: req.get("fullName"),
        email: req.get("email"),
        username: req.get("username"),
        telp: req.get("telp"),
        address: req.get("address"),
        gender: req.get("gender"),
        birthdate: req.get("birthdate"),
        avatarUrl: fileUrl,
      };
      const result = await updateProfil(newProfil);
      if (result.status) {
        return NextResponse.json(
          { status: "success", data: result.data },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { status: "error", message: "Gagal mengedit profil" },
          { status: 500 }
        );
      }
    } catch (e) {
      return NextResponse.json(
        { status: "error", message: `Gagal mengedit profil ${e}` },
        { status: 500 }
      );
    }
  } else if (typeof image === "string" || image == null) {
    const newProfil = {
      id: req.get("id"),
      fullname: req.get("fullName"),
      email: req.get("email"),
      username: req.get("username"),
      telp: req.get("telp") === "" ? null : req.get("telp"),
      address: req.get("address"),
      gender: req.get("gender") === "" ? null : req.get("gender"),
      birthdate: req.get("birthdate") === "" ? null : req.get("birthdate"),
      avatarUrl: req.get("foto"),
    };
    console.log(newProfil.birthdate);
    const result = await updateProfil(newProfil);
    if (result.status) {
      return NextResponse.json(
        { status: "success", data: result.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "error", message: "Gagal mengedit Profil" },
        { status: 500 }
      );
    }
  }
}
