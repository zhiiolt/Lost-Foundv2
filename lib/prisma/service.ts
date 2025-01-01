/** @format */

import prisma from "./db";
import bycrpt from "bcrypt";
import { convertDateString } from "../time";
import streamServerClient from "../stream";

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
      const user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
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
        await streamServerClient.upsertUser({
          id: newUser.id,
          username: newUser.username,
          name: newUser.fullname,
        });
        return newUser;
      });
      if (user) {
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

export async function getAllLaporan(cursor: any, pagesize: number) {
  const laporan = await prisma.laporan.findMany({
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      comments: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
      likes: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: pagesize + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });
  if (laporan) {
    const nextCursor = laporan.length > pagesize ? laporan[pagesize].id : null;
    return {
      laporan: laporan.slice(0, pagesize),
      nextCursor,
    };
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
      comments: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
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
  const deleteComment = prisma.comment.deleteMany({
    where: {
      laporanId: id,
    },
  });
  const deleteLikes = prisma.likes.deleteMany({
    where: {
      laporanId: id,
    },
  });
  const deleteLaporan = prisma.laporan.delete({
    where: {
      id: id,
    },
  });
  const transaction = await prisma.$transaction([
    deleteComment,
    deleteLikes,
    deleteLaporan,
  ]);
  if (transaction) {
    return {
      status: true,
      message: "Laporan berhasil dihapus",
      data: transaction,
    };
  } else {
    return {
      status: false,
      message: "Gagal menghapus laporan",
    };
  }
}

export async function getComment(
  cursor: any,
  pagesize: number,
  laporanId: any
) {
  const komentar = await prisma.comment.findMany({
    where: {
      laporanId: laporanId,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: pagesize + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });
  if (komentar) {
    const nextCursor =
      komentar.length > pagesize ? komentar[pagesize].id : null;
    return {
      komentar: komentar.slice(0, pagesize),
      nextCursor,
    };
  } else {
    return null;
  }
}

export async function addComment(data: any) {
  const res = await prisma.comment.create({
    data: {
      laporanId: data.laporanId,
      userId: data.userId,
      isi: data.isi,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });
  if (res) {
    return {
      status: true,
      message: "Comment added",
      data: res,
    };
  } else {
    return {
      status: false,
      message: "Failed to add comment",
    };
  }
}

export async function updateProfil(data: any) {
  console.log(data.birthdate);

  const updatedUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: {
        id: data.id,
      },
      data: {
        fullname: data.fullname,
        email: data.email,
        username: data.username,
        profile: {
          update: {
            telp: data.telp ? data.telp : null,
            address: data.address ? data.address : null,
            gender: data.gender ? data.gender : null,
            birthDate: data.birthdate
              ? new Date(convertDateString(data.birthdate))
              : null,
            avatarUrl: data.avatarUrl,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        name: user.fullname,
      },
    });
    return user;
  });
  await streamServerClient.partialUpdateUser({
    id: updatedUser.id,
    set: {
      image: updatedUser?.profile?.avatarUrl,
    },
  });
  if (updatedUser) {
    return {
      status: true,
      message: "Profil berhasil diupdate",
      data: updatedUser,
    };
  } else {
    return { status: false, message: "Gagal mengedit profil" };
  }
}
