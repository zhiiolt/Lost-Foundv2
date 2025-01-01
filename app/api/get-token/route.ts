/** @format */

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import streamServerClient from "@/lib/stream";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log("calling get-token fir user", session?.user.id);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamServerClient.createToken(
      session.user.id,
      expirationTime,
      issuedAt
    );

    return Response.json({ token });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
