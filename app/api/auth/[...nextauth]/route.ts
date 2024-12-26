/** @format */

import { loginUser, loginWithGoogle } from "@/lib/prisma/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await loginUser({ email });
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return {
              id: user.id,
              fullname: user.fullname,
              email: user.email,
              username: user.username,
              telp: user.profile?.telp || null,
              address: user.profile?.address || null,
              gender: user.profile?.gender || null,
              birthdate: user.profile?.birthdate || null,
              avatarUrl: user.profile?.avatarUrl || null,
            };
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      // Merge data for Credentials login
      if (account?.provider === "credentials" && user) {
        token = {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          username: user.username,
          telp: user.telp,
          address: user.address,
          gender: user.gender,
          birthdate: user.birthdate,
          avatarUrl: user.avatarUrl,
        };
      }

      // Merge data for Google login
      if (account?.provider === "google" && profile) {
        const result: any = await loginWithGoogle({
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          type: "google",
        });
        console.log(result);

        if (result?.status) {
          token = {
            id: result.data.id,
            fullname: result.data.fullname,
            email: result.data.email,
            username: result.data.username,
            telp: result.data.profile?.telp || null,
            address: result.data.profile?.address || null,
            gender: result.data.profile?.gender || null,
            birthdate: result.data.profile?.birthdate || null,
            avatarUrl: result.data.profile?.avatarUrl || null,
          };
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      // Populate session.user from token
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          fullname: token.fullname,
          email: token.email,
          username: token.username,
          telp: token.telp,
          address: token.address,
          gender: token.gender,
          birthdate: token.birthdate,
          avatarUrl: token.avatarUrl,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
