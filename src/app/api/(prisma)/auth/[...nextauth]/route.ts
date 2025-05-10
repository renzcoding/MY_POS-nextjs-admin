/* import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
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
        // fullname: { label: "Fullname", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials as {
          email: string;
          password: string;
          // fullname: string;
        };

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const user: any = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      console.log("login with google", account);
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }

      // Login with Google
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };
      }

      console.log(token, account, user);
      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }

      console.log(session, token);
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
