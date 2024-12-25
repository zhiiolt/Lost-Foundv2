/** @format */

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    fullname: string;
    email: string;
    username: string;
    telp?: string;
    address?: string;
    gender?: string;
    birthdate?: string;
    avatarUrl?: string;
  }

  interface Session {
    user: User;
  }
}
