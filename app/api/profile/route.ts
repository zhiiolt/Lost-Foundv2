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

export async function PUT(request: NextRequest) {
  const req = await request.formData();
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
