/** @format */

import prisma from "./db";
import bycrpt from "bcrypt";
import { convertDateString } from "../time";

export async function registerUser(data: {
  name: string;
  email: string;
  username: string;
  password: string;
}) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { username: data.username }],
    },
  });
  if (user) {
    if (user.email === data.email && user.username === data.username) {
      return {
        status: false,
        message: "Email dan username sudah dipakai",
        statusCode: 400,
      };
    } else if (user.email === data.email) {
      return { status: false, message: "Email sudah dipakai", statusCode: 400 };
    } else if (user.username === data.username) {
      return {
        status: false,
        message: "Username sudah dipakai",
        statusCode: 400,
      };
    }
  } else {
    data.password = await bycrpt.hash(data.password, 10);
    try {
      const newUser = await prisma.user.create({
        data: {
          fullname: data.name,
          email: data.email,
          username: data.username,
          password: data.password,
          profile: {
            create: {},
          },
        },
      });
      if (newUser) {
        return {
          status: true,
          message: "User created successfully",
          statusCode: 200,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: `Failed to create user`,
        statusCode: 400,
      };
    }
  }
}

export async function loginUser(data: { email: string }) {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
    include: {
      profile: true,
    },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any) {
  const user = await prisma.user.findFirst({
    where: {
      id: data.id,
    },
    include: {
      profile: true,
    },
  });

  if (user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        fullname: data.name,
        profile: {
          update: {
            avatarUrl: data.image,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return {
      status: true,
      data: updatedUser,
    };
  } else {
    const newUser = await prisma.user.create({
      data: {
        id: data.id,
        username: data.email,
        password: data.email,
        email: data.email,
        fullname: data.name,
        profile: {
          create: {
            avatarUrl: data.image,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return {
      status: true,
      data: newUser,
    };
  }
}

export async function findUserbyEmail(email: any) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      profile: true,
    },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
}

export async function getAllLaporan() {
  const laporan = await prisma.laporan.findMany({
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      comments: true,
      likes: true,
    },
    orderBy: {
      tanggal: "desc",
    },
  });
  if (laporan) {
    return laporan;
  } else {
    return null;
  }
}

export async function getLaporanbyUserId(id: string) {
  const laporan = await prisma.laporan.findMany({
    where: {
      userId: id,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      comments: true,
      likes: true,
    },
    orderBy: {
      tanggal: "desc",
    },
  });
  if (laporan) {
    return laporan;
  } else {
    return null;
  }
}

export async function createLaporan(data: any) {
  const laporan = await prisma.laporan.create({
    data: {
      judul: data.judul,
      deskripsi: data.deskripsi,
      namaBarang: data.namaBarang,
      kategori: data.kategori,
      tanggal: new Date(convertDateString(data.tanggal)),
      ciri: data.ciri,
      lokasi: data.lokasi,
      fotoUrl: data.fotoUrl,
      jenis: data.jenis,
      status: data.status,
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
  if (laporan) {
    return { status: true, message: "Laporan berhasil dibuat", data: laporan };
  } else {
    return { status: false, message: "Gagal membuat laporan" };
  }
}

export async function updateLaporan(data: any) {
  const laporan = await prisma.laporan.update({
    where: {
      id: data.id,
    },
    data: {
      judul: data.judul,
      deskripsi: data.deskripsi,
      namaBarang: data.namaBarang,
      kategori: data.kategori,
      tanggal: new Date(convertDateString(data.tanggal)),
      ciri: data.ciri,
      lokasi: data.lokasi,
      fotoUrl: data.fotoUrl,
      jenis: data.jenis,
      status: data.status,
    },
  });
  if (laporan) {
    return {
      status: true,
      message: "Laporan berhasil diupdate",
      data: laporan,
    };
  } else {
    return { status: false, message: "Gagal mengedit laporan" };
  }
}

export async function deleteLaporan(id: string) {
  const laporan = await prisma.laporan.delete({
    where: {
      id: id,
    },
  });
  if (laporan) {
    return {
      status: true,
      message: "Laporan berhasil dihapus",
      data: laporan,
    };
  } else {
    return {
      status: false,
      message: "Gagal menghapus laporan",
    };
  }
}
