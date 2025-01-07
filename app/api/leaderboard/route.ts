/** @format */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma/db";

type PointsMap = {
  [userId: string]: number;
};

type LeaderboardEntry = {
  userId: string;
  points: number;
  rank: number;
  fullname: string;
  email: string;
  avatarUrl: string;
};

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullname: true,
      email: true,
      profile: {
        select: {
          avatarUrl: true,
        },
      },
    },
  });

  // Fetch points from different sources
  const laporanPoints = await prisma.laporan.groupBy({
    by: ["helperId"],
    _count: true,
    where: { helperId: { not: null } },
  });

  const commentPoints = await prisma.comment.groupBy({
    by: ["userId"],
    _count: true,
  });

  const likePoints = await prisma.likes.groupBy({
    by: ["userId"],
    _count: true,
  });

  const pointsMap: PointsMap = {};

  laporanPoints.forEach(({ helperId, _count }) => {
    if (!pointsMap[helperId || ""]) pointsMap[helperId || ""] = 0;
    pointsMap[helperId || ""] += _count;
  });

  commentPoints.forEach(({ userId, _count }) => {
    if (!pointsMap[userId]) pointsMap[userId] = 0;
    pointsMap[userId] += _count;
  });

  likePoints.forEach(({ userId, _count }) => {
    if (!pointsMap[userId]) pointsMap[userId] = 0;
    pointsMap[userId] += _count;
  });

  // Include users without points (with points = 0)
  users.forEach((user) => {
    if (!pointsMap[user.id]) {
      pointsMap[user.id] = 0;
    }
  });

  const leaderboard: LeaderboardEntry[] = Object.entries(pointsMap)
    .map(([userId, points]) => {
      const user = users.find((u) => u.id === userId);
      return {
        userId,
        points: points * 100,
        rank: 0,
        fullname: user?.fullname || "Unknown",
        email: user?.email || "Unknown",
        avatarUrl: user?.profile?.avatarUrl || "",
      };
    })
    .sort((a, b) => b.points - a.points);

  // Add rank after sorting
  leaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  return NextResponse.json(leaderboard);
}
