/** @format */

import { z } from "zod";

export const ProfileSchema = z.object({
  userID: z.string(),
  telp: z.string().max(15).nullable(),
  address: z.string().nullable(),
  gender: z.enum(["pria", "wanita"]).nullable(), // Adjust enums based on your actual Gender model
  birthDate: z.string().datetime().nullable(),
  avatarUrl: z.string().nullable(),
});

export const userSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  profile: ProfileSchema, // Modify based on actual profile structure
});

export const commentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  laporanId: z.string(),
  isi: z.string(),
  createdAt: z.string().datetime(),
  user: userSchema, // Sesuaikan jika ada perbedaan struktur user di Prisma
});

export const laporanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  jenis: z.enum(["kehilangan", "penemuan"]),
  fotoUrl: z.string().nullable(),
  judul: z.string(),
  deskripsi: z.string(),
  namaBarang: z.string(),
  kategori: z.string(),
  status: z.enum(["hilang", "ditemukan", "dikembalikan"]),
  tanggal: z.string().datetime(),
  ciri: z.string(),
  lokasi: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  helperId: z.string().nullable(),
  user: userSchema,
  comments: z.array(commentSchema).optional(), // Modify based on actual comment structure
  likes: z.array(z.any()).optional(), // Modify based on actual like structure
});

export type Laporan = z.infer<typeof laporanSchema>;
