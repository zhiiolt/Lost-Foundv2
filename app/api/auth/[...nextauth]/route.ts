/** @format */

import { loginUser, loginWithGoogle } from "@/lib/prisma/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
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
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.fullname = user.fullname;
        token.email = user.email;
        token.username = user.username;
        token.telp = user.profile?.telp;
        token.address = user.profile?.address;
        token.gender = user.profile?.gender;
        token.birthdate = user.profile?.birthdate;
        token.avatarUrl = user.profile?.avatarUrl;
      }
      if (account?.provider === "google") {
        console.log("Profile from Google:", profile);
        const data = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          type: "google",
        };
        await loginWithGoogle(data, (result: any) => {
          console.log(result);
          if (result.status) {
            token.id = result.data.id;
            token.fullname = result.data.fullname;
            token.email = result.data.email;
            token.username = result.data.username;
            token.telp = result.data.profile.telp;
            token.address = result.data.profile.address;
            token.gender = result.data.profile.gender;
            token.birthdate = result.data.profile.birthdate;
            token.avatarUrl = result.data.profile.avatarUrl;
          }
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("telp" in token) {
        session.user.telp = token.telp;
      }
      if ("address" in token) {
        session.user.address = token.address;
      }
      if ("gender" in token) {
        session.user.gender = token.gender;
      }
      if ("birthdate" in token) {
        session.user.birthdate = token.birthdate;
      }
      if ("avatarUrl" in token) {
        session.user.avatarUrl = token.avatarUrl;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
