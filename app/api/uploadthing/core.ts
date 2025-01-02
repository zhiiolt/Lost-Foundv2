/** @format */

import { getServerSession } from "next-auth";
import { createUploadthing, FileRouter } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma/db";

const f = createUploadthing();

export const fileRouter = {
  image: f({
    image: { maxFileSize: "8MB" },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session) {
        throw new Error("Unauthorized");
      }
      return { session };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const newAvatarUrl = file.url.replace(
        "/f/",
        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`
      );

      await prisma.user.update({
        where: { id: metadata.session.user.id },
        data: {
          profile: {
            update: {
              avatarUrl: newAvatarUrl,
            },
          },
        },
      });
      return { avatarUrl: newAvatarUrl };
    }),
} satisfies FileRouter;

export type AppFileRoute = typeof fileRouter;
